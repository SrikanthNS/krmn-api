const rateLimit = require("express-rate-limit");
const multer = require("multer");
const path = require("path");

const careersLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 applications per hour per IP
  message: { message: "Too many applications. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Store resumes in memory (sent as email attachment, not persisted on disk)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are accepted."));
    }
  },
});

module.exports = function (app) {
  const nodemailer = require("nodemailer");

  app.post(
    "/api/careers/apply",
    careersLimiter,
    (req, res, next) => {
      upload.single("resume")(req, res, (err) => {
        if (err) {
          if (
            err instanceof multer.MulterError &&
            err.code === "LIMIT_FILE_SIZE"
          ) {
            return res
              .status(400)
              .json({ message: "Resume must be under 5 MB." });
          }
          return res
            .status(400)
            .json({ message: err.message || "File upload error." });
        }
        next();
      });
    },
    async (req, res) => {
      const { name, email, phone, position, message } = req.body;

      if (!name || !email) {
        return res
          .status(400)
          .json({ message: "Name and email are required." });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email address." });
      }

      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const mailOptions = {
          from: `"KRMN Careers" <${process.env.SMTP_USER}>`,
          to:
            process.env.CAREERS_EMAIL ||
            process.env.CONTACT_EMAIL ||
            "info@krmn.in",
          replyTo: email,
          subject: `Career Application: ${name}${position ? ` — ${position}` : ""}`,
          html: `
            <h2>New Career Application</h2>
            <table style="border-collapse:collapse;width:100%;max-width:600px;">
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
              ${phone ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone}</td></tr>` : ""}
              ${position ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Area of Interest</td><td style="padding:8px;border-bottom:1px solid #eee;">${position}</td></tr>` : ""}
              ${message ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Cover Note</td><td style="padding:8px;border-bottom:1px solid #eee;">${message}</td></tr>` : ""}
            </table>
            <p style="color:#888;font-size:12px;margin-top:20px;">Sent from krmn.in careers page</p>
          `,
          attachments: req.file
            ? [
                {
                  filename: req.file.originalname || "resume.pdf",
                  content: req.file.buffer,
                  contentType: "application/pdf",
                },
              ]
            : [],
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Application submitted successfully." });
      } catch (error) {
        console.error("Careers form error:", error.message);
        res.status(500).json({
          message:
            "Failed to submit application. Please try again or email us directly.",
        });
      }
    },
  );
};
