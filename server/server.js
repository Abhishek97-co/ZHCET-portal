require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const path         = require('path');
const connectDB    = require('./src/config/db');

const app = express();
connectDB();

app.use(helmet({ contentSecurityPolicy: false }));   
app.use(morgan('dev'));
app.use(cors({
  origin:      process.env.CLIENT_URL || 'http://localhost:5000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client')));

app.use('/api/auth',        require('./src/routes/authRoutes'));
app.use('/api/faculties',   require('./src/routes/facultyRoutes'));
app.use('/api/departments', require('./src/routes/departmentRoutes'));
app.use('/api/college',     require('./src/routes/collegeRoutes'));

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});