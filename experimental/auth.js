const jwt = require('jsonwebtoken')


const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token) {
        res.status(403).send("Authentication token required! Please login.");
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch(err) {
        return res.status(401).send("Invalid Token!");
    }
    return next();
};
module.exports = verifyToken