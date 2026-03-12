const jwt = require("jsonwebtoken")

async function requireUser(req, res, next) {
    try {
        // 👇 read from cookie instead of Authorization header
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "Authorization failed. No access token."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token"
        });
    }
}

module.exports = requireUser;