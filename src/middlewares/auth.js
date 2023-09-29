const TOKEN_KEY = process.env.DB_NAME;
const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.user;
const userDetails = require('../helpers/userDetails');

async function verifyToken(_req, _res, _next) {
 if(_req.url !== '/login' && _req.url !== '/signup') {
    const token = _req.cookies['jwt-token'];

    if(!token) {
        return _res.status(401).json({
            message: 'Token is required'
        });
    }
    try {
        const data = await jwt.verify(token, TOKEN_KEY);
        try {
            const response = await User.findAll({
                where: {
                    email: data.user_name
                }
            });
            if(response.length) {
                userDetails.setDetails(response[0].dataValues);
                _next('route');
            } else {
                return _res.status(500).json({
                    message: 'An error occured while fetching user details'
                });
            }
        } catch (err) {
            return _res.status(500).json({
                message: 'An error occured'
            });
        }
    } catch (err) {
        return _res.status(401).json({
            message: 'Invalid Token'
        });
    }

 } else {
    _next('route');
 }
}

module.exports = verifyToken;