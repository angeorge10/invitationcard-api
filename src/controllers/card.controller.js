const db = require("../models");
const Card = db.card;
const CardInvitees = db.cardInvitees;
const sequelize = db.sequelize;
const userDetails = require("../helpers/userDetails");
const {sendEmail} = require("../helpers/mailer");

async function create(_req, _res) {
    // Validate request
    if (!_req.body) {
        return _res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        const invalidFields = [];
        const { title, description, date, time, location, email, templateId } = _req.body
        if (!title) {
            invalidFields.push('name');
        }
        if (!date) {
            invalidFields.push('date');
        }
        if (!location) {
            invalidFields.push('location');
        }
        if (!email || !Array.isArray(email) || !email.length) {
            invalidFields.push('email');
        }
        if (!templateId) {
            invalidFields.push('template');
        }

        if (invalidFields.length) {
            return _res.status(400).send({
                message: `${invalidFields.toString()} ${invalidFields.length === 1 ? 'field is' : 'fields are'} empty`
            });
        } else {
            const cardDetails = {
                title,
                description,
                date,
                time,
                location,
                templateId,
                userId: userDetails.details.userId
            };
            try {
                const transactionData = await sequelize.transaction(async (transaction) => {
                    const data = await Card.create(cardDetails, {transaction});
                    const postData = email.map(item => {
                      return {
                        email: item,
                        cardId: data.id
                      };  
                    });
                    const finalData = await CardInvitees.bulkCreate(postData, {transaction});
                    return data;
                });
                sendEmail(cardDetails, email);
                _res.status(200)
                    .json({ id: transactionData.id });
            } catch (err) {
                _res.status(500).json({
                    message:
                        err.errors && err.errors.length && err.errors[0].message || err.message || "An error occurred while creating Card."
                });
            }
        }
    }

}

async function getAll(_req, _res) {
    try {
        const result = await Card.findAll({
            where: {
                userId: userDetails.details.userId
            }
        });
        return _res.json(result)
    } catch (err) {
        _res.status(500).json({
            message:
                err.errors && err.errors.length && err.errors[0].message || err.message || "An error occurred while creating User."
        });
    }
}

async function getById(_req, _res) {
    try {
        const result = await Card.findAll({
            where: {
                id: _req.params.id
            }
        });
        if (result.length) {
            return _res.json(result)
        } else {
            return _res.status(204);
        }
        
    } catch (err) {
        _res.status(500).json({
            message:
                err.errors && err.errors.length && err.errors[0].message || err.message || "An error occurred while creating User."
        });
    }
}


module.exports = {
    create,
    getAll,
    getById
};