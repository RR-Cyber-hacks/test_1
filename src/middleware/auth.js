const jwt = require('jsonwebtoken');
const Register = require('../models/registerUser');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt_token;
        if (!token) {
            return res.status(401).json({ message: 'You are not authenticated!' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await Register.findById(decoded._id);
        req.token = token;

        if (!req.user) {
            return res.status(401).json({ message: 'User not found!' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Token verification failed!' });
    }
};


module.exports = auth;