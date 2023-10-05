module.exports = (sequelize, Sequelize, Plan) => {
    const User = sequelize.define("users", {
        userId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        loginToken: {
            type: Sequelize.STRING
        },
        planId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Plan,
                key: 'id'
            }
        }
    });

    return User;
};