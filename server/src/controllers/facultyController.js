const Faculty = require('../models/Faculty');

exports.getAllFaculties = async (req, res, next) => {
  try {
    const { search, dept, page = 1, limit = 12 } = req.query;
    const filter = { isActive: true };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } },
        { facultyId: { $regex: search, $options: 'i' } },
      ];
    }
    if (dept) filter.department = dept;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Faculty.countDocuments(filter);
    const data = await Faculty.find(filter)
      .populate('department', 'name shortName')
      .sort({ name: 1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ data, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) { next(err); }
};

exports.getFacultyById = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id)
      .populate('department', 'name shortName');
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json(faculty);
  } catch (err) { next(err); }
};

exports.createFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json(faculty);
  } catch (err) { next(err); }
};

exports.updateFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    }).populate('department', 'name shortName');
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json(faculty);
  } catch (err) { next(err); }
};

exports.deleteFaculty = async (req, res, next) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: 'Faculty deleted successfully' });
  } catch (err) { next(err); }
};

exports.updateContactInfo = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

    const isOwner = faculty.userId?.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin)
      return res.status(403).json({ message: 'You can only update your own contact info' });

    const { mobile, email } = req.body;
    if (mobile !== undefined) faculty.mobile = mobile;
    if (email !== undefined) faculty.email = email;
    await faculty.save();
    res.json(faculty);
  } catch (err) { next(err); }
};