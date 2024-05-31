module.exports = (req, res, next) => {
    // check if there is userId in the user's session, otherwise redirect to login
    if (!req.session.userId) {
        res.redirect('/login');
        return;
    }
    next();
}