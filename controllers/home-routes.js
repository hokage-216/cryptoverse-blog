const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      logged_in: req.session.logged_in,
      dashboard: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/home', async (req, res) => {
  console.log('Printing session info: ', req.session);
  try {
    console.log('Attempting Login')
    if (!req.session.logged_in) {
      console.log('Logged out');
      res.render('home', {
        logged_in: req.session.logged_in,
        home: true
      });
    } else {
      console.log('Logged in');
      res.render('dashboard', {
        dashboard: true,
        logged_in: req.session.logged_in
      });
    }
    // res.render('dashboard', {dashboard: true, logged_in: true,});
    // res.status(200).json({message: 'You are logged in!'});
  } catch (error) {
    res.status(500).json(error);
  }
});

// SIGN UP ROUTES

router.get('/signup', async (req, res) => {
  try {
    res.render('signup', {logged_in: req.session.logged_in, signup: true});
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN ROUTES

router.get('/login', async (req, res) => {
  try {
    res.render('login', {login: true});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;