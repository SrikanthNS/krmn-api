module.exports = (sequelize, Sequelize) => {
    const UserRoles = sequelize.define("user_roles", {});

    return UserRoles;
};