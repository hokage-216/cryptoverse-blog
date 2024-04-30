const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    //Grab and display feed data for all users posts
    const postData = await BlogPost.findAll({
      include: [User]
    });

    // map posts data
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', {
      posts,
      logged_in: req.session.logged_in,
      home: true
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/home', async (req, res) => {
  console.log('Printing session info: ', req.session);

  //Grab and display feed data for all users posts
  const postData = await BlogPost.findAll({
    include: [User, Comment]
  });

  // map posts data
  const posts = postData.map((post) => post.get({ plain: true }));

  try {
    console.log('Attempting Login Display');
    if (!req.session.logged_in) {
      console.log('No User Login');
      res.render('home', {
        posts,
        logged_in: req.session.logged_in,
        home: true
      });
    } else {
      console.log('User Logged in');
      res.render('home', {
        posts,
        dashboard: true,
        logged_in: req.session.logged_in
      });
    }
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