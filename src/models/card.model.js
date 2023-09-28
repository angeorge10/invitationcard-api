const cardModel = (sequelize, Sequelize, User) => {
    const Card = sequelize.define("card", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING,
            allowNull: false
        },
        time: {
            type: Sequelize.STRING,
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        },
        templateId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'userId'
            }
        }
    });
    return Card;
};

module.exports = cardModel;