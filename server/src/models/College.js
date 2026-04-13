const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
  name: { type: String, default: 'Zakir Husain College of Engineering & Technology' },
  tagline: { type: String, default: 'Aligarh Muslim University' },
  about: { type: String, default: '' },
  bannerImage: { type: String, default: '' },
  established: { type: Number, default: 1966 },
  achievements: [{
    title: String,
    year: Number,
    description: String,
  }],
  stats: {
    totalFaculty: { type: Number, default: 0 },
    totalDepartments: { type: Number, default: 0 },
    totalStudents: { type: Number, default: 0 },
  },
  contact: {
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    website: { type: String, default: '' },
  },
}, { timestamps: true });

module.exports = mongoose.model('College', CollegeSchema);