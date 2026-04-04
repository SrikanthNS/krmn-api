module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    itemsPerPage: {
      type: Sequelize.INTEGER,
      defaultValue: 20,
    },
    darkModeSettings: {
      type: Sequelize.STRING,
      defaultValue: JSON.stringify({
        mode: "off",
        customFrom: "20:00",
        customTo: "06:00",
      }),
    },
  });

  return User;
};
