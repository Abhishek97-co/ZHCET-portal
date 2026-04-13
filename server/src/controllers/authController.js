const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const COOKIE_OPTS = {
  httpOnly: true,
  secure:   process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge:   7 * 24 * 60 * 60 * 1000,
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email }).populate('faculty');
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, COOKIE_OPTS);
    res.json({ _id: user._id, email: user.email, role: user.role, faculty: user.faculty });
  } catch (err) { next(err); }
};

exports.logout = (req, res) => {
  res.clearCookie('token', COOKIE_OPTS);
  res.json({ message: 'Logged out' });
};

exports.getMe = (req, res) => {
  res.json(req.user);
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ email, password, role: role || 'student' });
    res.status(201).json({ _id: user._id, email: user.email, role: user.role });
  } catch (err) { next(err); }
};