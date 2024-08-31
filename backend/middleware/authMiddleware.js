const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized, no token' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part after 'Bearer'
    
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateJWT;
