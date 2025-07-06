const express = require('express');
const { verifyToken, allowRoles } = require('../middleware/auth');
const router = express.Router();

router.get('/dashboard', verifyToken, allowRoles('student'), (req, res) => {
  res.json({ message: '🎓 Welcome Student!', user: req.user });
});

module.exports = router;
