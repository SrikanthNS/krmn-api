/**
 * Seed script – populates the database with demo data.
 *
 * Usage:
 *   node seed.js          # seed without dropping existing data
 *   node seed.js --force  # drop & recreate all tables first
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const bcrypt = require("bcryptjs");
const db = require("./app/models");

const Role = db.role;
const User = db.user;
const Client = db.client;
const Task = db.task;
const FeatureFlag = db.featureFlag;

const force = process.argv.includes("--force");

async function seed() {
  console.log(
    force
      ? "⚠️  Force mode: dropping & recreating all tables..."
      : "Syncing tables (no drop)...",
  );
  await db.sequelize.sync({ force });

  // ── Roles ──────────────────────────────────────────────
  const roles = [
    { id: 1, name: "user" },
    { id: 2, name: "moderator" },
    { id: 3, name: "admin" },
    { id: 4, name: "superadmin" },
  ];
  for (const r of roles) {
    await Role.findOrCreate({ where: { id: r.id }, defaults: r });
  }
  console.log("✔ Roles seeded");

  // ── Users ──────────────────────────────────────────────
  const passwordHash = bcrypt.hashSync("password123", 8);

  const usersData = [
    {
      username: "admin",
      email: "admin@krmn.demo",
      password: passwordHash,
      roleIds: [3, 4],
    },
    {
      username: "mod_priya",
      email: "priya@krmn.demo",
      password: passwordHash,
      roleIds: [2],
    },
    {
      username: "rahul_sharma",
      email: "rahul@krmn.demo",
      password: passwordHash,
      roleIds: [1],
    },
    {
      username: "anita_verma",
      email: "anita@krmn.demo",
      password: passwordHash,
      roleIds: [1],
    },
    {
      username: "dev_kumar",
      email: "dev@krmn.demo",
      password: passwordHash,
      roleIds: [1, 2],
    },
    {
      username: "sneha_rao",
      email: "sneha@krmn.demo",
      password: passwordHash,
      roleIds: [1],
    },
    {
      username: "vijay_patil",
      email: "vijay@krmn.demo",
      password: passwordHash,
      roleIds: [1],
    },
    {
      username: "megha_joshi",
      email: "megha@krmn.demo",
      password: passwordHash,
      roleIds: [2, 3],
    },
  ];

  const users = [];
  for (const u of usersData) {
    const [user] = await User.findOrCreate({
      where: { username: u.username },
      defaults: {
        username: u.username,
        email: u.email,
        password: u.password,
      },
    });
    await user.setRoles(u.roleIds);
    users.push(user);
  }
  console.log(`✔ ${users.length} users seeded  (password: password123)`);

  // ── Clients ────────────────────────────────────────────
  const clientNames = [
    "Acme Corp",
    "Globex Industries",
    "Initech Solutions",
    "Umbrella LLC",
    "Stark Enterprises",
    "Wayne Technologies",
    "Oscorp Research",
    "Pied Piper Inc",
    "Hooli Systems",
    "Dunder Mifflin",
  ];

  const clients = [];
  for (const name of clientNames) {
    const [client] = await Client.findOrCreate({
      where: { name },
      defaults: { name },
    });
    clients.push(client);
  }
  console.log(`✔ ${clients.length} clients seeded`);

  // ── Tasks ──────────────────────────────────────────────
  const taskTypes = [
    "GST Filing",
    "Income Tax Return",
    "TDS Return",
    "Audit",
    "Bookkeeping",
    "Company Registration",
    "ROC Filing",
    "Payroll Processing",
    "Advisory",
    "Consultation",
  ];

  const billingCategories = [
    "Hourly",
    "Fixed",
    "Retainer",
    "Pro-bono",
    "Project",
  ];

  const descriptions = [
    "Prepare and file quarterly GST returns",
    "Review financial statements for annual audit",
    "Process monthly payroll for all employees",
    "Prepare TDS computation and file returns",
    "Reconcile bank statements with books",
    "Draft board resolution for AGM",
    "File annual ROC compliance documents",
    "Prepare income tax return for AY 2025-26",
    "Advisory on new GST regulations impact",
    "Set up accounting system for new entity",
    "Verify expense claims and reimbursements",
    "Compile tax-saving investment proofs",
    "Prepare projected cash flow statement",
    "Review vendor contracts for compliance",
    "Generate MIS reports for management review",
    "Update depreciation schedule for fixed assets",
    "Handle TDS certificate requests from vendors",
    "Prepare comparative P&L analysis",
    "File DIR-3 KYC for all directors",
    "Complete internal audit checklist",
  ];

  const statuses = ["todo", "in-progress", "completed"];

  // Generate dates spread across the last 90 days
  function randomDate(daysBack = 90) {
    const d = new Date();
    d.setDate(d.getDate() - Math.floor(Math.random() * daysBack));
    return d;
  }

  const tasksToCreate = [];
  for (let i = 0; i < 60; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const client = clients[Math.floor(Math.random() * clients.length)];
    const assigner = users[Math.floor(Math.random() * users.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    tasksToCreate.push({
      taskType: taskTypes[Math.floor(Math.random() * taskTypes.length)],
      billingCategory:
        billingCategories[Math.floor(Math.random() * billingCategories.length)],
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
      minutesSpent:
        status === "completed"
          ? Math.floor(Math.random() * 480) + 30
          : status === "in-progress"
            ? Math.floor(Math.random() * 240)
            : null,
      date: randomDate(),
      completed: status === "completed",
      status,
      userId: user.id,
      clientId: client.id,
      assignedBy: assigner.id,
    });
  }

  await Task.bulkCreate(tasksToCreate, { ignoreDuplicates: true });
  console.log(`✔ ${tasksToCreate.length} tasks seeded`);

  // ── Feature Flags ──────────────────────────────────────
  const flags = [
    {
      key: "user_preferences",
      enabled: true,
      description: "Allow users to set preferences like items per page",
    },
    {
      key: "dark_mode",
      enabled: true,
      description: "Allow users to switch between light and dark themes",
    },
    {
      key: "ai_agent",
      enabled: false,
      description:
        "Enable KAI — KRMN AI assistant for natural language interactions",
    },
    {
      key: "visualization",
      enabled: true,
      description:
        "Enable performance dashboards and analytics (Admin & above only)",
    },
    {
      key: "task_prefill",
      enabled: true,
      description:
        "Let users prefill new task forms from their recent task history",
    },
  ];

  for (const f of flags) {
    await FeatureFlag.findOrCreate({
      where: { key: f.key },
      defaults: f,
    });
  }
  console.log("✔ Feature flags seeded");

  // ── Done ───────────────────────────────────────────────
  console.log("\n🎉 Seed complete!");
  console.log("   Demo login → admin@krmn.demo / password123");
  await db.sequelize.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
