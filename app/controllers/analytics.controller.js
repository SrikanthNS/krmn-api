const db = require("../models");
const Task = db.task;
const User = db.user;
const Client = db.client;
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;

/**
 * Build a date range condition for task.date.
 * Defaults to last 30 days if neither dateFrom nor dateTo is provided.
 */
function buildDateCondition(dateFrom, dateTo) {
  const condition = {};
  if (dateFrom || dateTo) {
    condition.date = {};
    if (dateFrom) condition.date[Op.gte] = dateFrom;
    if (dateTo) condition.date[Op.lte] = dateTo + " 23:59:59";
  } else {
    // Default: last 30 days
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);
    condition.date = { [Op.gte]: thirtyDaysAgo };
  }
  return condition;
}

// ── 1. Company Performance ──
// Returns daily/weekly/monthly task counts, minutes worked, and status breakdown
exports.companyPerformance = async (req, res) => {
  const { dateFrom, dateTo, groupBy = "day" } = req.query;
  const dateCondition = buildDateCondition(dateFrom, dateTo);

  try {
    // Group-by expression based on granularity
    const groupExpressions = {
      day: [Sequelize.fn("DATE", Sequelize.col("date")), "period"],
      week: [
        Sequelize.fn("DATE_FORMAT", Sequelize.col("date"), "%x-W%v"),
        "period",
      ],
      month: [
        Sequelize.fn("DATE_FORMAT", Sequelize.col("date"), "%Y-%m"),
        "period",
      ],
    };
    const groupExpr = groupExpressions[groupBy] || groupExpressions.day;

    // Tasks over time
    const tasksOverTime = await Task.findAll({
      where: dateCondition,
      attributes: [
        groupExpr,
        [Sequelize.fn("COUNT", Sequelize.col("id")), "taskCount"],
        [
          Sequelize.fn(
            "COALESCE",
            Sequelize.fn("SUM", Sequelize.col("minutesSpent")),
            0,
          ),
          "totalMinutes",
        ],
      ],
      group: ["period"],
      order: [[Sequelize.col("period"), "ASC"]],
      raw: true,
    });

    // Status breakdown for the period
    const statusBreakdown = await Task.findAll({
      where: dateCondition,
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["status"],
      raw: true,
    });

    // Category breakdown
    const categoryBreakdown = await Task.findAll({
      where: { ...dateCondition, billingCategory: { [Op.ne]: "" } },
      attributes: [
        "billingCategory",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
        [
          Sequelize.fn(
            "COALESCE",
            Sequelize.fn("SUM", Sequelize.col("minutesSpent")),
            0,
          ),
          "totalMinutes",
        ],
      ],
      group: ["billingCategory"],
      order: [[Sequelize.col("count"), "DESC"]],
      raw: true,
    });

    // Overall totals
    const totals = await Task.findOne({
      where: dateCondition,
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("id")), "totalTasks"],
        [
          Sequelize.fn(
            "COALESCE",
            Sequelize.fn("SUM", Sequelize.col("minutesSpent")),
            0,
          ),
          "totalMinutes",
        ],
      ],
      raw: true,
    });

    res.send({
      tasksOverTime,
      statusBreakdown,
      categoryBreakdown,
      totals: {
        totalTasks: Number(totals.totalTasks),
        totalMinutes: Number(totals.totalMinutes),
      },
    });
  } catch (err) {
    console.error("Company performance error:", err);
    res.status(500).send({
      message: err.message || "Error retrieving company performance data.",
    });
  }
};

// ── 2. Staff Performance ──
// Returns per-staff task counts, minutes worked, status breakdown
exports.staffPerformance = async (req, res) => {
  const { dateFrom, dateTo, userId } = req.query;
  const dateCondition = buildDateCondition(dateFrom, dateTo);

  try {
    const userCondition = userId ? { userId: userId } : {};

    // Per-staff aggregates
    const staffStats = await Task.findAll({
      where: { ...dateCondition, ...userCondition },
      attributes: [
        "userId",
        [Sequelize.fn("COUNT", Sequelize.col("task.id")), "taskCount"],
        [
          Sequelize.fn(
            "COALESCE",
            Sequelize.fn("SUM", Sequelize.col("minutesSpent")),
            0,
          ),
          "totalMinutes",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              "CASE WHEN task.status = 'completed' THEN 1 ELSE 0 END",
            ),
          ),
          "completedCount",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              "CASE WHEN task.status = 'in-progress' THEN 1 ELSE 0 END",
            ),
          ),
          "inProgressCount",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              "CASE WHEN task.status = 'todo' THEN 1 ELSE 0 END",
            ),
          ),
          "todoCount",
        ],
      ],
      include: [{ model: User, as: "owner", attributes: ["id", "username"] }],
      group: ["userId", "owner.id"],
      order: [[Sequelize.col("taskCount"), "DESC"]],
      raw: false,
    });

    // If specific user, also get their daily trend
    let dailyTrend = [];
    if (userId) {
      dailyTrend = await Task.findAll({
        where: { ...dateCondition, userId },
        attributes: [
          [Sequelize.fn("DATE", Sequelize.col("date")), "period"],
          [Sequelize.fn("COUNT", Sequelize.col("id")), "taskCount"],
          [
            Sequelize.fn(
              "COALESCE",
              Sequelize.fn("SUM", Sequelize.col("minutesSpent")),
              0,
            ),
            "totalMinutes",
          ],
        ],
        group: ["period"],
        order: [[Sequelize.col("period"), "ASC"]],
        raw: true,
      });
    }

    const result = staffStats.map((s) => ({
      userId: s.userId,
      username: s.owner?.username || "Unknown",
      taskCount: Number(s.dataValues.taskCount),
      totalMinutes: Number(s.dataValues.totalMinutes),
      completedCount: Number(s.dataValues.completedCount),
      inProgressCount: Number(s.dataValues.inProgressCount),
      todoCount: Number(s.dataValues.todoCount),
    }));

    res.send({ staff: result, dailyTrend });
  } catch (err) {
    console.error("Staff performance error:", err);
    res.status(500).send({
      message: err.message || "Error retrieving staff performance data.",
    });
  }
};

// ── 3. Client Delivery ──
// Returns per-client task counts, minutes delivered, task type breakdown
exports.clientDelivery = async (req, res) => {
  const { dateFrom, dateTo, clientId } = req.query;
  const dateCondition = buildDateCondition(dateFrom, dateTo);

  try {
    const clientCondition = clientId ? { clientId: clientId } : {};

    // Per-client aggregates
    const clientStats = await Task.findAll({
      where: {
        ...dateCondition,
        ...clientCondition,
        clientId: { [Op.ne]: null },
      },
      attributes: [
        "clientId",
        [Sequelize.fn("COUNT", Sequelize.col("task.id")), "taskCount"],
        [
          Sequelize.fn(
            "COALESCE",
            Sequelize.fn("SUM", Sequelize.col("minutesSpent")),
            0,
          ),
          "totalMinutes",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              "CASE WHEN task.status = 'completed' THEN 1 ELSE 0 END",
            ),
          ),
          "completedCount",
        ],
      ],
      include: [{ model: Client, attributes: ["id", "name"] }],
      group: ["clientId", "client.id"],
      order: [[Sequelize.col("taskCount"), "DESC"]],
      raw: false,
    });

    // If specific client, get monthly trend
    let monthlyTrend = [];
    if (clientId) {
      monthlyTrend = await Task.findAll({
        where: { ...dateCondition, clientId },
        attributes: [
          [
            Sequelize.fn("DATE_FORMAT", Sequelize.col("date"), "%Y-%m"),
            "period",
          ],
          [Sequelize.fn("COUNT", Sequelize.col("id")), "taskCount"],
          [
            Sequelize.fn(
              "COALESCE",
              Sequelize.fn("SUM", Sequelize.col("minutesSpent")),
              0,
            ),
            "totalMinutes",
          ],
        ],
        group: ["period"],
        order: [[Sequelize.col("period"), "ASC"]],
        raw: true,
      });
    }

    // Task type breakdown per client
    let taskTypeBreakdown = [];
    if (clientId) {
      taskTypeBreakdown = await Task.findAll({
        where: { ...dateCondition, clientId, taskType: { [Op.ne]: "" } },
        attributes: [
          "taskType",
          [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
          [
            Sequelize.fn(
              "COALESCE",
              Sequelize.fn("SUM", Sequelize.col("minutesSpent")),
              0,
            ),
            "totalMinutes",
          ],
        ],
        group: ["taskType"],
        order: [[Sequelize.col("count"), "DESC"]],
        raw: true,
      });
    }

    const result = clientStats.map((s) => ({
      clientId: s.clientId,
      clientName: s.client?.name || "Unknown",
      taskCount: Number(s.dataValues.taskCount),
      totalMinutes: Number(s.dataValues.totalMinutes),
      completedCount: Number(s.dataValues.completedCount),
    }));

    res.send({ clients: result, monthlyTrend, taskTypeBreakdown });
  } catch (err) {
    console.error("Client delivery error:", err);
    res.status(500).send({
      message: err.message || "Error retrieving client delivery data.",
    });
  }
};
