module.exports = (req, res, next) => {
    if (res.locals.user) {
        return next();
    }

    return res.status(403).json({
        err: 'not authorized to access this route',
        type: 'unauthorized',
        body: 'Youre not authorized to access this route! Are you signed in?',
    });
};
