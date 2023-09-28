const cardInviteesModel = (sequelize, Sequelize, Card) => {
    const CardInvitees = sequelize.define("cardInvitees", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cardId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Card,
                key: 'id'
            }
        }
    });
    return CardInvitees;
};

module.exports = cardInviteesModel;