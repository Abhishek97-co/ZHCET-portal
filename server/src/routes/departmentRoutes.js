const router = require('express').Router();
const ctrl = require('../controllers/departmentController');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');

router.get('/', ctrl.getAllDepartments);
router.get('/:id', ctrl.getDepartmentById);

router.post('/', verifyJWT, checkRole('admin'), ctrl.createDepartment);
router.put('/:id', verifyJWT, checkRole('admin'), ctrl.updateDepartment);
router.delete('/:id', verifyJWT, checkRole('admin'), ctrl.deleteDepartment);

module.exports = router;