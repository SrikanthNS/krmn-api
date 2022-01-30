module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        taskType: {
            type: Sequelize.STRING,
            defaultValue: ""
        },
        description: {
            type: Sequelize.STRING
        },
        minutesSpent: {
            type: Sequelize.INTEGER,
            allowNull: false,
            alias: "time spent in minutes"
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    });

    return Task;
};
