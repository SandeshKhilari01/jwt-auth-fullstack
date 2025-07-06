const express = require('express');
const { verifyToken, allowRoles } = require('../middleware/auth');
const router = express.Router();

const User = require('../models/User');
const adminOnly = require('../middleware/adminOnly');


router.get('/dashboard', verifyToken, allowRoles('admin'), (req, res) => {
  res.json({ message: '🧑‍💼 Welcome Admin!', user: req.user });
});


// GET all users
router.get('/users', adminOnly, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'role', 'createdAt']
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// DELETE user by ID
router.delete('/users/:id', adminOnly, async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
