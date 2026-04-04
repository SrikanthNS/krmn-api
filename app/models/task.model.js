module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define(
    "task",
    {
      taskType: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      billingCategory: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      description: {
        type: Sequelize.STRING,
      },
      minutesSpent: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "in-progress",
        validate: {
          isIn: [["todo", "in-progress", "completed"]],
        },
      },
      assignedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      indexes: [
        { fields: ["userId"] },
        { fields: ["clientId"] },
        { fields: ["status"] },
      ],
    },
  );

  return Task;
};
