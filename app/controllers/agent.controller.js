const { isAdmin, isAdminOrMod } = require("../helpers/checkUser");
const db = require("../models");
const Task = db.task;
const Client = db.client;
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

// ── Tool definitions describing what the agent can do ──
const TOOLS = [
  {
    name: "list_tasks",
    description:
      "List tasks with optional filters: status (todo, in-progress, completed), clientId, date range, search text",
    params: [
      "status",
      "description",
      "clientId",
      "dateFrom",
      "dateTo",
      "page",
      "size",
    ],
  },
  {
    name: "create_task",
    description:
      "Create a new task. Required: description, taskType, billingCategory. Optional: status, minutesSpent, date, clientId",
    params: [
      "description",
      "taskType",
      "billingCategory",
      "status",
      "minutesSpent",
      "date",
      "clientId",
    ],
  },
  {
    name: "get_task",
    description: "Get details of a specific task by its ID",
    params: ["taskId"],
  },
  {
    name: "update_task",
    description:
      "Update a task by ID. Provide only the fields to change: description, status, minutesSpent, clientId, taskType, billingCategory",
    params: [
      "taskId",
      "description",
      "status",
      "minutesSpent",
      "clientId",
      "taskType",
      "billingCategory",
    ],
  },
  {
    name: "delete_task",
    description: "Delete a task by its ID",
    params: ["taskId"],
  },
  {
    name: "task_summary",
    description:
      "Get a summary of task counts by status, optionally filtered by date range or client",
    params: ["dateFrom", "dateTo", "clientId"],
  },
  {
    name: "list_clients",
    description: "List all clients, optionally search by name",
    params: ["name", "page", "size"],
  },
  {
    name: "create_client",
    description: "Create a new client with a given name",
    params: ["name"],
  },
  {
    name: "list_users",
    description: "List all staff/users (admin only)",
    params: ["name", "page", "size"],
  },
  {
    name: "my_profile",
    description: "Get the current logged-in user's profile info",
    params: [],
  },
  {
    name: "help",
    description: "Show all available commands and what the agent can do",
    params: [],
  },
];

// ── Intent recognition via keyword matching ──
function recognizeIntent(message) {
  const msg = message.toLowerCase().trim();

  // Help
  if (/^(help|what can you do|commands|capabilities)/i.test(msg)) {
    return { tool: "help", params: {} };
  }

  // My profile
  if (/\b(my profile|who am i|my info|my account|my details)\b/i.test(msg)) {
    return { tool: "my_profile", params: {} };
  }

  // Task summary / stats
  if (
    /\b(task summary|task stats|task count|how many tasks|overview|dashboard)\b/i.test(
      msg,
    )
  ) {
    const params = {};
    const clientMatch = msg.match(/client\s*(?:id\s*)?(\d+)/i);
    if (clientMatch) params.clientId = Number.parseInt(clientMatch[1], 10);
    const dateFromMatch = msg.match(/from\s+(\d{4}-\d{2}-\d{2})/);
    if (dateFromMatch) params.dateFrom = dateFromMatch[1];
    const dateToMatch = msg.match(/to\s+(\d{4}-\d{2}-\d{2})/);
    if (dateToMatch) params.dateTo = dateToMatch[1];
    return { tool: "task_summary", params };
  }

  // Delete task
  if (
    /\b(delete|remove)\b.*\btask\b/i.test(msg) ||
    /\btask\b.*\b(delete|remove)\b/i.test(msg)
  ) {
    const idMatch =
      msg.match(/(?:task\s*(?:id\s*)?#?\s*|id\s+)(\d+)/i) ||
      msg.match(/\b(\d+)\b/);
    if (idMatch)
      return {
        tool: "delete_task",
        params: { taskId: Number.parseInt(idMatch[1], 10) },
      };
    return {
      tool: "error",
      params: { message: "Please specify which task ID to delete." },
    };
  }

  // Update task
  if (
    /\b(update|edit|change|modify|mark)\b.*\btask\b/i.test(msg) ||
    /\btask\b.*\b(update|edit|change|modify|mark)\b/i.test(msg)
  ) {
    const idMatch =
      msg.match(/(?:task\s*(?:id\s*)?#?\s*|id\s+)(\d+)/i) ||
      msg.match(/\b(\d+)\b/);
    if (!idMatch)
      return {
        tool: "error",
        params: { message: "Please specify which task ID to update." },
      };
    const params = { taskId: Number.parseInt(idMatch[1], 10) };

    // Status
    if (/\b(completed|complete|done|finished)\b/i.test(msg))
      params.status = "completed";
    else if (/\b(in.?progress|ongoing|started|working)\b/i.test(msg))
      params.status = "in-progress";
    else if (/\b(todo|to.?do|pending|not started)\b/i.test(msg))
      params.status = "todo";

    // Description
    const descMatch = msg.match(/description\s+(?:to\s+)?["']?(.+?)["']?\s*$/i);
    if (descMatch) params.description = descMatch[1];

    return { tool: "update_task", params };
  }

  // Create task
  if (
    /\b(create|add|new)\b.*\btask\b/i.test(msg) ||
    /\btask\b.*\b(create|add|new)\b/i.test(msg)
  ) {
    const params = {};
    // Extract quoted description
    const descMatch = msg.match(/["']([^"']+)["']/);
    if (descMatch) {
      params.description = descMatch[1];
    } else {
      // Try extracting after common prepositions
      const afterCreate = msg.match(
        /(?:create|add|new)\s+(?:a\s+)?task\s+(?:for\s+|called\s+|named\s+|:?\s*)(.+)/i,
      );
      if (afterCreate) {
        let desc = afterCreate[1]
          .replace(/\b(with|type|category|client|status|minutes|for)\b.*/i, "")
          .trim();
        if (desc) params.description = desc;
      }
    }
    const typeMatch = msg.match(/type\s+["']?([^"',]+?)["']?(?:\s|,|$)/i);
    if (typeMatch) params.taskType = typeMatch[1].trim();
    const catMatch = msg.match(
      /(?:category|billing)\s+["']?([^"',]+?)["']?(?:\s|,|$)/i,
    );
    if (catMatch) params.billingCategory = catMatch[1].trim();
    const clientMatch = msg.match(/client\s*(?:id\s*)?(\d+)/i);
    if (clientMatch) params.clientId = Number.parseInt(clientMatch[1], 10);
    const minMatch = msg.match(/(\d+)\s*(?:min|minutes)/i);
    if (minMatch) params.minutesSpent = Number.parseInt(minMatch[1], 10);
    const statusMatch = msg.match(/status\s+(\w[\w-]*)/i);
    if (statusMatch) params.status = statusMatch[1];

    return { tool: "create_task", params };
  }

  // Get single task
  if (
    /\b(?:get|show|view|find|details?\s*(?:of|for)?)\b.*\btask\b/i.test(msg) ||
    /\btask\b.*\b(?:details?|info)\b/i.test(msg)
  ) {
    const idMatch =
      msg.match(/(?:task\s*(?:id\s*)?#?\s*|id\s+)(\d+)/i) ||
      msg.match(/\b(\d+)\b/);
    if (idMatch)
      return {
        tool: "get_task",
        params: { taskId: Number.parseInt(idMatch[1], 10) },
      };
  }

  // List tasks
  if (
    /\b(list|show|get|find|search|my|all)\b.*\btasks?\b/i.test(msg) ||
    /\btasks?\b.*\blist\b/i.test(msg)
  ) {
    const params = {};
    if (/\bcompleted?\b/i.test(msg)) params.status = "completed";
    else if (/\bin.?progress\b/i.test(msg)) params.status = "in-progress";
    else if (/\btodo\b/i.test(msg)) params.status = "todo";
    const clientMatch = msg.match(/client\s*(?:id\s*)?(\d+)/i);
    if (clientMatch) params.clientId = Number.parseInt(clientMatch[1], 10);
    const searchMatch = msg.match(
      /(?:search|containing|about|with)\s+["']?([^"']+)["']?/i,
    );
    if (searchMatch) params.description = searchMatch[1].trim();
    const dateFromMatch = msg.match(/from\s+(\d{4}-\d{2}-\d{2})/);
    if (dateFromMatch) params.dateFrom = dateFromMatch[1];
    const dateToMatch = msg.match(/to\s+(\d{4}-\d{2}-\d{2})/);
    if (dateToMatch) params.dateTo = dateToMatch[1];
    return { tool: "list_tasks", params };
  }

  // Create client
  if (/\b(create|add|new)\b.*\bclient\b/i.test(msg)) {
    const nameMatch =
      msg.match(/(?:called|named|name)\s+["']?([^"']+)["']?/i) ||
      msg.match(/["']([^"']+)["']/);
    const params = {};
    if (nameMatch) params.name = nameMatch[1].trim();
    return { tool: "create_client", params };
  }

  // List clients
  if (
    /\b(list|show|get|find|search|all)\b.*\bclients?\b/i.test(msg) ||
    /\bclients?\b/i.test(msg)
  ) {
    const params = {};
    const searchMatch = msg.match(
      /(?:search|named?|called)\s+["']?([^"']+)["']?/i,
    );
    if (searchMatch) params.name = searchMatch[1].trim();
    return { tool: "list_clients", params };
  }

  // List users/staff
  if (
    /\b(list|show|get|find|all)\b.*\b(users?|staff|team)\b/i.test(msg) ||
    /\b(staff|team)\b.*\blist\b/i.test(msg)
  ) {
    const params = {};
    const searchMatch = msg.match(/(?:search|named?)\s+["']?([^"']+)["']?/i);
    if (searchMatch) params.name = searchMatch[1].trim();
    return { tool: "list_users", params };
  }

  return { tool: "unknown", params: {} };
}

// ── Tool executors ──
async function executeHelp() {
  return {
    message: "Here's what I can help you with:",
    capabilities: [
      '📋 **List tasks** — "show my tasks", "list completed tasks", "tasks from 2026-01-01 to 2026-03-31"',
      "➕ **Create task** — \"create task 'Review documents' type Audit category Billable\"",
      '🔍 **View task** — "show task 42", "task details for 15"',
      '✏️ **Update task** — "mark task 5 as completed", "update task 10 status in-progress"',
      '🗑️ **Delete task** — "delete task 42"',
      '📊 **Task summary** — "task summary", "how many tasks"',
      '🏢 **List clients** — "show clients", "search clients named Acme"',
      "➕ **Create client** — \"add client named 'New Corp'\"",
      '👥 **List staff** — "show all users" (admin only)',
      '👤 **My profile** — "who am i", "my profile"',
      '❓ **Help** — "help", "what can you do"',
    ],
  };
}

async function executeListTasks(params, userId) {
  const isAdminUser = await isAdmin(userId);
  const page = Number.parseInt(params.page) || 1;
  const size = Math.min(Number.parseInt(params.size) || 10, 100);
  const offset = (page - 1) * size;

  const condition = {};
  if (!isAdminUser) condition.userId = userId;
  if (params.status) condition.status = { [Op.in]: params.status.split(",") };
  if (params.description)
    condition.description = { [Op.like]: `%${params.description}%` };
  if (params.clientId) condition.clientId = params.clientId;
  if (params.dateFrom || params.dateTo) {
    condition.date = {};
    if (params.dateFrom) condition.date[Op.gte] = params.dateFrom;
    if (params.dateTo) condition.date[Op.lte] = params.dateTo + " 23:59:59";
  }

  const { count, rows } = await Task.findAndCountAll({
    where: condition,
    include: [
      { model: db.client, attributes: ["id", "name"] },
      { model: db.user, as: "owner", attributes: ["id", "username"] },
    ],
    order: [
      ["date", "DESC"],
      ["createdAt", "DESC"],
    ],
    limit: size,
    offset,
    raw: false,
  });

  const tasks = rows.map((t) => ({
    id: t.id,
    description: t.description,
    status: t.status,
    taskType: t.taskType,
    billingCategory: t.billingCategory,
    minutesSpent: t.minutesSpent,
    date: t.date,
    client: t.client ? t.client.name : null,
    owner: t.owner ? t.owner.username : null,
  }));

  return {
    message:
      count === 0
        ? "No tasks found matching your criteria."
        : `Found ${count} task${count !== 1 ? "s" : ""}. Showing page ${page}:`,
    tasks,
    totalItems: count,
    totalPages: Math.ceil(count / size),
    currentPage: page,
  };
}

async function executeCreateTask(params, userId) {
  if (!params.description) {
    return {
      message:
        'Please provide a task description. Example: create task "Review Q1 reports" type Audit category Billable',
    };
  }
  if (!params.taskType) {
    return {
      message:
        'Please specify a task type. Example: create task "Review docs" type Audit category Billable',
    };
  }
  if (!params.billingCategory) {
    return {
      message:
        'Please specify a billing category. Example: create task "Review docs" type Audit category Billable',
    };
  }

  const taskStatus = params.status || "in-progress";
  const task = await Task.create({
    description: params.description,
    taskType: params.taskType,
    billingCategory: params.billingCategory,
    status: taskStatus,
    completed: taskStatus === "completed",
    minutesSpent: params.minutesSpent
      ? Number.parseInt(params.minutesSpent, 10)
      : null,
    date: params.date ? new Date(params.date) : new Date(),
    userId: userId,
    clientId: params.clientId || null,
  });

  return {
    message: `Task #${task.id} created successfully!`,
    task: {
      id: task.id,
      description: task.description,
      status: task.status,
      taskType: task.taskType,
      billingCategory: task.billingCategory,
      date: task.date,
    },
  };
}

async function executeGetTask(params, userId) {
  if (!params.taskId) {
    return { message: "Please specify a task ID. Example: show task 42" };
  }
  const task = await Task.findByPk(params.taskId, {
    include: [
      { model: db.client, attributes: ["id", "name"] },
      { model: db.user, as: "owner", attributes: ["id", "username"] },
      { model: db.user, as: "reviewer", attributes: ["id", "username"] },
    ],
  });
  if (!task) return { message: `Task #${params.taskId} not found.` };

  const isAdminUser = await isAdmin(userId);
  if (!isAdminUser && task.userId !== userId) {
    return { message: "You don't have permission to view this task." };
  }

  return {
    message: `Task #${task.id} details:`,
    task: {
      id: task.id,
      description: task.description,
      status: task.status,
      taskType: task.taskType,
      billingCategory: task.billingCategory,
      minutesSpent: task.minutesSpent,
      date: task.date,
      client: task.client ? task.client.name : null,
      owner: task.owner ? task.owner.username : null,
      reviewer: task.reviewer ? task.reviewer.username : null,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    },
  };
}

async function executeUpdateTask(params, userId) {
  if (!params.taskId) {
    return {
      message:
        "Please specify a task ID. Example: update task 5 status completed",
    };
  }
  const task = await Task.findByPk(params.taskId);
  if (!task) return { message: `Task #${params.taskId} not found.` };

  const isAdminUser = await isAdmin(userId);
  if (!isAdminUser && task.userId !== userId) {
    return { message: "You don't have permission to update this task." };
  }

  const updates = {};
  if (params.description) updates.description = params.description;
  if (params.status) {
    updates.status = params.status;
    updates.completed = params.status === "completed";
  }
  if (params.minutesSpent !== undefined)
    updates.minutesSpent = Number.parseInt(params.minutesSpent, 10);
  if (params.clientId) updates.clientId = params.clientId;
  if (params.taskType) updates.taskType = params.taskType;
  if (params.billingCategory) updates.billingCategory = params.billingCategory;

  if (Object.keys(updates).length === 0) {
    return {
      message:
        "No update fields provided. Specify what to change, e.g.: update task 5 status completed",
    };
  }

  await Task.update(updates, { where: { id: params.taskId } });
  return { message: `Task #${params.taskId} updated successfully!`, updates };
}

async function executeDeleteTask(params, userId) {
  if (!params.taskId) {
    return { message: "Please specify a task ID. Example: delete task 42" };
  }
  const task = await Task.findByPk(params.taskId);
  if (!task) return { message: `Task #${params.taskId} not found.` };

  const isAdminUser = await isAdmin(userId);
  if (!isAdminUser && task.userId !== userId) {
    return { message: "You don't have permission to delete this task." };
  }

  await Task.destroy({ where: { id: params.taskId } });
  return { message: `Task #${params.taskId} deleted successfully.` };
}

async function executeTaskSummary(params, userId) {
  const isAdminUser = await isAdmin(userId);
  const condition = {};
  if (!isAdminUser) condition.userId = userId;
  if (params.clientId) condition.clientId = params.clientId;
  if (params.dateFrom || params.dateTo) {
    condition.date = {};
    if (params.dateFrom) condition.date[Op.gte] = params.dateFrom;
    if (params.dateTo) condition.date[Op.lte] = params.dateTo + " 23:59:59";
  }

  const tasks = await Task.findAll({
    where: condition,
    attributes: ["status", "completed", "minutesSpent"],
  });

  const counts = { todo: 0, "in-progress": 0, completed: 0 };
  let totalMinutes = 0;
  tasks.forEach((t) => {
    const s = t.status || (t.completed ? "completed" : "in-progress");
    if (counts[s] !== undefined) counts[s]++;
    if (t.minutesSpent) totalMinutes += t.minutesSpent;
  });

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  return {
    message: "Task Summary:",
    summary: {
      total: tasks.length,
      todo: counts.todo,
      inProgress: counts["in-progress"],
      completed: counts.completed,
      totalTime: `${hours}h ${mins}m`,
      totalMinutes,
    },
  };
}

async function executeListClients(params) {
  const condition = {};
  if (params.name) condition.name = { [Op.like]: `%${params.name}%` };
  const page = Number.parseInt(params.page) || 1;
  const size = Math.min(Number.parseInt(params.size) || 20, 100);
  const offset = (page - 1) * size;

  const { count, rows } = await Client.findAndCountAll({
    where: condition,
    order: [["name", "ASC"]],
    attributes: ["id", "name"],
    limit: size,
    offset,
  });

  return {
    message:
      count === 0
        ? "No clients found."
        : `Found ${count} client${count !== 1 ? "s" : ""}:`,
    clients: rows.map((c) => ({ id: c.id, name: c.name })),
    totalItems: count,
  };
}

async function executeCreateClient(params) {
  if (!params.name) {
    return {
      message:
        "Please provide a client name. Example: add client named 'Acme Corp'",
    };
  }
  const client = await Client.create({ name: params.name });
  return {
    message: `Client "${client.name}" (ID: ${client.id}) created successfully!`,
  };
}

async function executeListUsers(params, userId) {
  const isAdminUser = await isAdmin(userId);
  if (!isAdminUser) {
    return { message: "Only admins can view the staff list." };
  }
  const condition = {};
  if (params.name) condition.username = { [Op.like]: `%${params.name}%` };
  const page = Number.parseInt(params.page) || 1;
  const size = Math.min(Number.parseInt(params.size) || 20, 100);
  const offset = (page - 1) * size;

  const { count, rows } = await User.findAndCountAll({
    where: condition,
    attributes: ["id", "username", "isActive"],
    limit: size,
    offset,
    distinct: true,
  });

  return {
    message:
      count === 0
        ? "No users found."
        : `Found ${count} user${count !== 1 ? "s" : ""}:`,
    users: rows.map((u) => ({
      id: u.id,
      username: u.username,
      isActive: u.isActive,
    })),
    totalItems: count,
  };
}

async function executeMyProfile(userId) {
  const user = await User.findByPk(userId, {
    include: [
      { model: Role, attributes: ["name"], through: { attributes: [] } },
    ],
    attributes: ["id", "username", "email", "isActive", "createdAt"],
  });
  if (!user) return { message: "User not found." };

  return {
    message: "Your profile:",
    profile: {
      id: user.id,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      roles: user.roles.map((r) => r.name),
      memberSince: user.createdAt,
    },
  };
}

// ── Main chat endpoint ──
exports.chat = async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).send({ message: "Please provide a message." });
  }

  // Enforce max message length
  if (message.length > 500) {
    return res
      .status(400)
      .send({ message: "Message too long. Maximum 500 characters." });
  }

  const userId = req.userId;

  try {
    const { tool, params } = recognizeIntent(message.trim());

    let result;
    switch (tool) {
      case "help":
        result = await executeHelp();
        break;
      case "list_tasks":
        result = await executeListTasks(params, userId);
        break;
      case "create_task":
        result = await executeCreateTask(params, userId);
        break;
      case "get_task":
        result = await executeGetTask(params, userId);
        break;
      case "update_task":
        result = await executeUpdateTask(params, userId);
        break;
      case "delete_task":
        result = await executeDeleteTask(params, userId);
        break;
      case "task_summary":
        result = await executeTaskSummary(params, userId);
        break;
      case "list_clients":
        result = await executeListClients(params);
        break;
      case "create_client":
        result = await executeCreateClient(params);
        break;
      case "list_users":
        result = await executeListUsers(params, userId);
        break;
      case "my_profile":
        result = await executeMyProfile(userId);
        break;
      case "error":
        result = { message: params.message };
        break;
      default:
        result = {
          message:
            'Sorry, I didn\'t catch that. Try "show my tasks", "create task", "list clients", or type "help" to see everything KAI can do.',
        };
    }

    res.send({ tool, ...result });
  } catch (err) {
    console.error("Agent error:", err);
    res.status(500).send({
      message:
        "Something went wrong processing your request. Please try again.",
    });
  }
};

// ── Return tool/capability list ──
exports.getTools = (_req, res) => {
  res.send({ tools: TOOLS });
};
