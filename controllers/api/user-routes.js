const router = require('express').Router();
const {User} = require('../../models');

router.get('/', (req, res) => {
    try {
        res.render('login');
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get('/dashboard', (req, res) => {
  try {
    res.render('dashboard', {logged_in: true, dashboard: true});
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/logout', (req, res) => {
  try {
    res.render('home', {logged_out: true});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;