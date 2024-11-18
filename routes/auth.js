const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Register Page
router.get('/register', (req, res) => res.sendFile('register.html', { root: './views' }));

// Register Handle
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || !email || !password) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.json(errors);
  } else {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.json({ msg: 'Email is already registered' });
    } else {
      const newUser = new User({ name, email, password });
      await newUser.save();
      req.flash('success_msg', 'You are now registered');
      res.redirect('/auth/login');
    }
  }
});

// Login Page
router.get('/login', (req, res) => res.sendFile('login.html', { root: './views' }));

// Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
  });
});

module.exports = router;
