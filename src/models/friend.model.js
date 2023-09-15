const friendModel = (sequelize, Sequelize, User) => {
    const Friend = sequelize.define("friend", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
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
    return Friend;
};

module.exports = friendModel;