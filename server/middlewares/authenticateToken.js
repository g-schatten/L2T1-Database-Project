const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ success: false, message: 'Authentication token missing' });
//     }

//     jwt.verify(token, 'gasgasgas', (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ success: false, message: 'Invalid token' });
//         }
//         req.userId = decoded.userId;
//         next();
//     });
// };

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, 'gasgasgas');
    
        // Add user from payload
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

module.exports = authenticateToken;