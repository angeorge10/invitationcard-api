const templateModel = (sequelize, Sequelize) => {
    const Template = sequelize.define("templates", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        imagePath: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Template;
};

module.exports = templateModel;