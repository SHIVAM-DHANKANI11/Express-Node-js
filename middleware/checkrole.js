const jwt = require('jsonwebtoken');

// Middleware to verify admin role
const checkAdminRole = (req, res, next) => {
    try {
        // 1. Look for the token in the Authorization Header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // 2. Extract the actual token string (remove "Bearer " prefix)
        const token = authHeader.split(' ')[1];

        // 3. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Check the role
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden: Admin access only" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        // Handles expired or tampered tokens
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = { checkAdminRole };