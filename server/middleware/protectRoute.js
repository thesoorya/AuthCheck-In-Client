const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies['notes'];

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized - No Token Provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.error('Error protecting route:', error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
