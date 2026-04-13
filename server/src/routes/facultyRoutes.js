const router = require('express').Router();
const ctrl = require('../controllers/facultyController');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

// Public
router.get('/', ctrl.getAllFaculties);
router.get('/:id', ctrl.getFacultyById);

// Faculty own contact update OR admin
router.patch('/:id/contact', verifyJWT, ctrl.updateContactInfo);

// Admin only
router.post('/', verifyJWT, checkRole('admin'), ctrl.createFaculty);
router.put('/:id', verifyJWT, checkRole('admin'), ctrl.updateFaculty);
router.delete('/:id', verifyJWT, checkRole('admin'), ctrl.deleteFaculty);

module.exports = router;