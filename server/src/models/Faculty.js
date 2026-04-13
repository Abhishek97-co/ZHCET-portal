
const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  facultyId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  designation: { type: String, required: true },
  mobile: { type: String, default: '' },
  email: { type: String, required: true, unique: true, lowercase: true },
  specialization: { type: [String], default: [] },
  qualifications: { type: [String], default: [] },
  publications: { type: [String], default: [] },
  photo: { type: String, default: '' },
  experience: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

FacultySchema.index({ name: 'text', specialization: 'text', designation: 'text' });

module.exports = mongoose.model('Faculty', FacultySchema);