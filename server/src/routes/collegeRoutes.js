const router    = require('express').Router();
const College   = require('../models/College');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

router.get('/', async (req, res) => {
  try {
    let college = await College.findOne();
    if (!college) college = await College.create({});
    res.json(college);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin only
router.put('/', verifyJWT, checkRole('admin'), async (req, res) => {
  try {
    let college = await College.findOne();
    if (!college) college = new College();
    Object.assign(college, req.body);
    await college.save();
    res.json(college);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;