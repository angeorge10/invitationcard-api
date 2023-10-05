const db = require("../models");
const User = db.user;

async function signup(_req, _res) {
    // Validate request
    if (!_req.body) {
        return _res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        const invalidFields = [];
        const { firstName, lastName, email, password } = _req.body
        if (!firstName) {
            invalidFields.push('firstName');
        }
        if (!lastName) {
            invalidFields.push('lastName');
        }
        if (!email) {
            invalidFields.push('email');
        }
        if (!password) {
            invalidFields.push('password');
        }

        if (invalidFields.length) {
            return _res.status(400).send({
                message: `${invalidFields.toString()} ${invalidFields.length === 1 ? 'field is' : 'fields are'} empty`
            });
        } else {
            const userDetails = {
                firstName,
                lastName,
                email,
                password,
                planId: 1
            };
            try {
                const data = await User.create(userDetails);
                _res.status(200)
                    .json({ message: 'User account created' });
            } catch (err) {
                _res.status(500).json({
                    message:
                        err.errors && err.errors.length && err.errors[0].message || err.message || "An error occurred while creating User."
                });
            }
        }
    }

}

module.exports = {
    signup
};