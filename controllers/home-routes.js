const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      logged_in: req.session.logged_in, 
      home: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/home', async (req, res) => {
  try {
    res.render('home', {
      logged_in: !!req.session.logged_in, 
      home: true 
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// SIGN UP ROUTES

router.get('/signup', async (req, res) => {
  try {
    res.render('signup', {logged_out: true, signup: true});
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    // Assuming User.create() correctly handles password hashing etc.
    const userData = await User.create({ email, password, username });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log(req.session);
      console.log("Logged in:", req.session.logged_in);
    });

    res.json({ user: userData, message: 'You are now signed up! Welcome!' });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: 'Internal server error', error: error.toString() });
  }
});

// LOGIN ROUTES

router.get('/login', async (req, res) => {
  try {
    res.render('login', {logged_in: false, login: true});
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {

    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log(req.session);
      console.log("Logged in:", req.session.logged_in);
    });

  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGOUT ROUTE

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.toString() });
      }
      res.redirect('/home');
    });
  } else {
    res.redirect('/home');
  }
});

module.exports = router;