const planModel = (sequelize, Sequelize) => {
    const Plan = sequelize.define("plans", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        no_of_cards: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });
    return Plan;
};

module.exports = planModel;