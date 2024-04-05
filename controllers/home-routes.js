const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({});

    const users = userData.map((users) => users.get({ plain: true }));

    res.render('home', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/home', (req, res) => {
  try {
    res.render('home', {logged_out: true, home: true});
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/signup', (req, res) => {
  try {
    res.render('signup', {logged_out: true, signup: true});
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const userData = await User.create({email, password, username});
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    });
    res.redirect('/');
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login', {logged_out: true, login: true});
});

router.post('/login', async (req, res) => {
  try {

    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      alert("Incorrect email or password, please try again");
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      alert("Incorrect email or password, please try again");
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    });

    res.redirect('/');

  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
    res.redirect('home', {logged_out: true, home: true});
  } else {
    res.status(404).end();
    res.redirect('home', {logged_in: true, home: true});
  }
});

module.exports = router;