const express = require('express');
const { verifyToken, allowRoles } = require('../middleware/auth');
const router = express.Router();

router.get('/dashboard', verifyToken, allowRoles('teacher'), (req, res) => {
  res.json({ message: '👩‍🏫 Welcome Teacher!', user: req.user });
});

module.exports = router;
