module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("clients", {
        name: {
            type: Sequelize.STRING
        }
    });

    return Client;
};