const withAuth = require('../../utils/auth');
const {BlogPost, Comment} = require('../../models');
const router = require('express').Router();

// New Post Routes
router.get('/newPost', withAuth, async (req, res) => {
    try {
        res.render('newPost', {newpost: true});
      } catch (err) {
        res.status(500).json(err);
      }
});

// Update Post Routes
router.post('/updatePost', withAuth, async (req, res) => {
  try {

      res.render('updatePost', {newpost: true});
    } catch (err) {
      res.status(500).json(err);
    }
});

// Edit Post Routes


module.exports = router;