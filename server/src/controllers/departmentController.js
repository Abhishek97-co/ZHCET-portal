const Department = require('../models/Department');
const Faculty    = require('../models/Faculty');

exports.getAllDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find().populate('hod', 'name designation photo');
    const result = await Promise.all(departments.map(async (d) => {
      const count = await Faculty.countDocuments({ department: d._id, isActive: true });
      return { ...d.toObject(), facultyCount: count };
    }));
    res.json(result);
  } catch (err) { next(err); }
};

exports.getDepartmentById = async (req, res, next) => {
  try {
    const dept = await Department.findById(req.params.id).populate('hod', 'name designation photo');
    if (!dept) return res.status(404).json({ message: 'Department not found' });
    res.json(dept);
  } catch (err) { next(err); }
};

exports.createDepartment = async (req, res, next) => {
  try {
    const dept = await Department.create(req.body);
    res.status(201).json(dept);
  } catch (err) { next(err); }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const dept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dept) return res.status(404).json({ message: 'Department not found' });
    res.json(dept);
  } catch (err) { next(err); }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Department deleted' });
  } catch (err) { next(err); }
};