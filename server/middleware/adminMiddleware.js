const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin"){
        return res.status(403).json({
            message: "access denied."
        })
    }
    next()
}

module.exports = adminMiddleware