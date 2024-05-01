const withAuth = require('../../utils/auth');
const {User, BlogPost, Comment} = require('../../models');
const router = require('express').Router();

// New Post Routes
router.get('/new-post', withAuth, async (req, res) => {
    try {
        res.render('newPost', {newpost: true});
      } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/new-post', withAuth, async (req, res) => {
  try {
      res.render('newPost', {newpost: true});
    } catch (err) {
      res.status(500).json(err);
    }
});

// Update Post Routes
router.post('/update-post', withAuth, async (req, res) => {
  try {

      res.render('updat-post', {newpost: true});
    } catch (err) {
      res.status(500).json(err);
    }
});

// Edit Post Routes
router.get('/edit-post/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    const post = postData.get({ plain: true });
    res.render('edit-post', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/edit-post/:id', withAuth, async (req, res) => {
  try {
    const updateResult = await BlogPost.update({
      title: req.body.title,
      content: req.body.content
    }, {
      where: {
        id: req.params.id
      }
    });

    if (updateResult > 0) {
      res.redirect('/dashboard');
    } else {
      res.status(404).json({ message: 'No post found with this id or no update made!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;