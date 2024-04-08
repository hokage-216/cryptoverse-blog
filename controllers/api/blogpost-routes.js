const withAuth = require('../../utils/auth');
const {BlogPost, Comment} = require('../../models');

const router = require('express').Router();

router.get('/newpost', withAuth, async (req, res) => {
    try {
        res.render('newpost', {newpost: true});
      } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/newpost', withAuth, async (req, res) => {
  try {

      res.render('newpost', {newpost: true});
    } catch (err) {
      res.status(500).json(err);
    }
});



module.exports = router;