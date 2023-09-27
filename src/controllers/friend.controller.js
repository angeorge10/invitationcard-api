const db = require("../models");
const Friend = db.friend;
const userDetails = require("../helpers/userDetails");

async function create(_req, _res) {
    // Validate request
    if (!_req.body) {
        return _res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        const invalidFields = [];
        const { name, email } = _req.body
        if (!name) {
            invalidFields.push('name');
        }
        if (!email) {
            invalidFields.push('email');
        }

        if (invalidFields.length) {
            return _res.status(400).send({
                message: `${invalidFields.toString()} ${invalidFields.length === 1 ? 'field is' : 'fields are'} empty`
            });
        } else {
            const friendDetails = {
                name,
                email,
                userId: userDetails.details.userId
            };
            try {
                const data = await Friend.create(friendDetails);
                _res.status(200)
                    .json({ message: 'Friend added successfully' });
            } catch (err) {
                _res.status(500).json({
                    message:
                        err.errors && err.errors.length && err.errors[0].message || err.message || "An error occurred while creating User."
                });
            }
        }
    }

}

async function getAll(_req, _res) {
    try {
        const result = await Friend.findAll({
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

module.exports = {
    create,
    getAll
};