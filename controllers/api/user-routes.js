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
    res.render('dashboard', {logged_in: req.session.logged_in, dashboard: true});
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login Route

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
      req.session.username = userData.username;
      req.session.logged_in = true;
      console.log(req.session);
    });

    res.status(200).json({userData});

  } catch (error) {
    res.status(500).json(error);
  }
});

// Sign-Up Route

router.post('/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    // Assuming User.create() correctly handles password hashing etc.
    const userData = await User.create({ email, password, username });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      console.log(req.session);
    });

    res.status(200).json({message: 'Sign Up Successful!'});

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: 'Internal server error', error: error.toString() });
  }
}); 

// Logout Route

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

