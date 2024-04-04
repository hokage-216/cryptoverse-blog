const router = require('express').Router();

router.get('/', (req, res) => {
    try {
        res.render('login');
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;