const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 submissions per hour per IP
  message: { message: "Too many enquiries. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = function (app) {
  const nodemailer = require("nodemailer");

  app.post("/api/contact", contactLimiter, async (req, res) => {
    const { name, email, phone, company, service, message } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    // Basic email format check
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
        from: `"KRMN Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || "info@krmn.in",
        replyTo: email,
        subject: `New Enquiry: ${name}${service ? ` — ${service}` : ""}`,
        html: `
          <h2>New Contact Enquiry</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
            ${phone ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone}</td></tr>` : ""}
            ${company ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Company</td><td style="padding:8px;border-bottom:1px solid #eee;">${company}</td></tr>` : ""}
            ${service ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Service</td><td style="padding:8px;border-bottom:1px solid #eee;">${service}</td></tr>` : ""}
            ${message ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Message</td><td style="padding:8px;border-bottom:1px solid #eee;">${message}</td></tr>` : ""}
          </table>
          <p style="color:#888;font-size:12px;margin-top:20px;">Sent from krmn.in contact form</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({ message: "Enquiry sent successfully." });
    } catch (error) {
      console.error("Contact form error:", error.message);
      res
        .status(500)
        .json({
          message:
            "Failed to send enquiry. Please try again or email us directly.",
        });
    }
  });
};
