module.exports = (sequelize, Sequelize) => {
  const FeatureFlag = sequelize.define("feature_flags", {
    key: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return FeatureFlag;
};
