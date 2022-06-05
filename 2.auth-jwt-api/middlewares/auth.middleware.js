const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../config/jwt');

const verifyToken = (req, res, next) => {
    
    const token = req.body.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        req.user = decoded;

    } catch (err) {
        return res.status(401).send('Invalid Token')
    }
    
    return next();
}

module.exports = verifyToken;