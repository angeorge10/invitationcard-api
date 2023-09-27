const db = require("../models");
const User = db.user;
const jwt = require('jsonwebtoken');
//TODO: To be moved to github secret or Parameter store
const TOKEN_KEY = process.env.DB_NAME;
async function login(_req, _res) {
    const { email, password } = _req.body;
    // Validate user input
    if (!(email && password)) {
        _res.status(400).json({ message: 'Required details not provided' });
        return;
    }
    try {
        const response = await User.findAll({
            where: {
                email,
                password
            }
        });
        if (response.length) {
            try {
                const token = await jwt.sign(
                    { user_name: email },
                    TOKEN_KEY,
                    {
                        expiresIn: '4h',
                    }
                );
                if (token) {
                    _res.cookie('jwt-token', token, { httpOnly: true }).json({ message: 'Logged In' });
                } else {
                    _res.status(500).json({ message: 'Token not generated' });
                }
            } catch (err) {
                _res.status(500).json({ message: 'Error in token creation' });
            }
        } else {
            _res.status(401).json({ message: 'Invalid Credentials' });
        }

    } catch (err) {
        _res.status(500).json({
            message:
                err.message || "An error occurred while creating User."
        });
    }
}

async function logout(_req, res) {
    return res
        .clearCookie('jwt-token')
        .status(200)
        .json({ message: 'Successfully logged out' });
}

module.exports = {
    login,
    logout,
};