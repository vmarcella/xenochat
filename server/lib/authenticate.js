const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (!req.header('Authorization')) {
        res.locals.user = null;
    } else {
        // Grab the auth token from the header
        const token = req.header('Authorization').split()[1];
        const decodedToken = jwt.decode(token, { complete: true }) || {};
        res.locals.user = decodedToken.payload;
    }
    return next();
};
