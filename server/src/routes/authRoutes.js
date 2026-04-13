const router = require('express').Router();
const { login, logout, getMe, register } = require('../controllers/authController');
const verifyJWT = require('../middleware/verifyJWT');

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.get('/me', verifyJWT, getMe);

module.exports = router;