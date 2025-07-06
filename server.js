require('dotenv').config();
const express = require('express');
const sequelize = require('./models');
const User = require('./models/User');
const cors = require('cors');



const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));

// ✅ Health check route BEFORE starting server
app.get('/', (req, res) => {
  res.send('✅ API is live');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/admin', adminRoutes);

// DB connection and sync
sequelize.sync({ alter: true })  // ✅ Perfect for fresh database - creates all tables
  .then(() => {
    console.log('✅ MySQL tables synced');

    // ✅ Start server only after everything is ready
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ Database error:', err));