const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const verifyJWT = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated. Please log in.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password').populate('faculty');
    if (!req.user) return res.status(401).json({ message: 'User no longer exists' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

module.exports = verifyJWT;