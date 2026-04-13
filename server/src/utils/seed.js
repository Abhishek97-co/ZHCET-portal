require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose   = require('mongoose');
const User       = require('../models/User');
const Department = require('../models/Department');
const Faculty    = require('../models/Faculty');
const connectDB  = require('../config/db');

const run = async () => {
  await connectDB();

  // Wipe existing
  await Promise.all([User.deleteMany(), Department.deleteMany(), Faculty.deleteMany()]);

  // Departments
  const depts = await Department.insertMany([
    { name: 'Computer Engineering',           shortName: 'CE',   established: 1970 },
    { name: 'Electrical Engineering',         shortName: 'EE',   established: 1966 },
    { name: 'Electronics Engineering',        shortName: 'ECE',  established: 1972 },
    { name: 'Mechanical Engineering',         shortName: 'ME',   established: 1966 },
  ]);

  // Sample faculties
  const faculties = await Faculty.insertMany([
    { facultyId: 'CE-001', name: 'Prof. Mohd. Nadeem Akhtar',    department: depts[0]._id, designation: 'Assistant Professor',           email: 'am.abbas@zhcet.ac.in',    specialization: ['Computer Networks', 'Adv. Computing'],      qualifications: ['B.Tech', 'M.Tech', 'Ph.D'] },
    { facultyId: 'CE-002', name: 'Mr. Muneeb Hasan Khan', department: depts[0]._id, designation: 'Assistant Professor', email: 'muneebkhan@zhcet.ac.in',  specialization: ['Design & Analysis of Algorithm', 'Data Structure & Algorithm'], qualifications: ['B.E', 'M.E', 'Ph.D'] },
    { facultyId: 'EE-001', name: 'Dr. Mohd. Faisal Jalil', department: depts[1]._id, designation: 'Assistant Professor',           email: 'mohdfaisaljalil@zhcet.ac.in',      specialization: ['Power Systems', 'Smart Grid'],           qualifications: ['B.Tech', 'M.Tech', 'Ph.D'] },
    { facultyId: 'ECE-001', name: 'Dr. Tajinder Singh Arora',   department: depts[2]._id, designation: 'Assistant Professor', email: 'tsarora@zhcet.ac.in',    specialization: ['Electronic Devices', 'Current mode signal processing'],      qualifications: ['B.Tech', 'M.Tech', 'Ph.D'] },
  ]);

  // Admin user
  await User.create({ email: 'admin@zhcet.ac.in', password: 'Admin@1234', role: 'admin' });

  // Faculty user linked to Muneeb Khan
  await User.create({ email: 'muneebkhan@zhcet.ac.in', password: 'Faculty@1234', role: 'faculty', faculty: faculties[1]._id });
  
  // Update facultyId's userId
  await Faculty.findByIdAndUpdate(faculties[1]._id, {
    userId: (await User.findOne({ email: 'muneebkhan@zhcet.ac.in' }))._id
  });

  console.log('Seed complete!');
  console.log('Admin   → admin@zhcet.ac.in   / Admin@1234');
  console.log('Faculty → muneebkhan@zhcet.ac.in / Faculty@1234');
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });