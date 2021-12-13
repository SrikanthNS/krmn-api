module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("clients", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });

    return Client;
};