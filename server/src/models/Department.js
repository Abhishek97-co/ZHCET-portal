const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  shortName: { type: String, required: true },
  description: { type: String, default: '' },
  hod: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', default: null },
  established: { type: Number },
  image: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Department', DepartmentSchema);