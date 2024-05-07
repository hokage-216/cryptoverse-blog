const withAuth = require('../../utils/auth');
const {User, BlogPost, Comment} = require('../../models');
const router = require('express').Router();

// New Post Routes
router.get('/new-post', withAuth, async (req, res) => {
    try {
        res.render('dashboard', {
          logged_in: req.session.logged_in, 
          newPost: true,
          dashboard: true
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/new-post', withAuth, async (req, res) => {
  try {
      const { title , content } = req.body;
      const postData = await BlogPost.create({ title, content, user_id: req.session.user_id });
      console.log(postData);
      res.redirect('/api/user/dashboard');
    } catch (err) {
      res.status(500).json(err);
    }
});

// Comment Post Routes

router.get('/add-comment/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id);
    console.log(postData);
    res.render('', {
      logged_in: req.session.logged_in,
      selected: true,
    })
  } catch (error) {
    res.status(500).json(err);
  }
});

// UPDATING OR EDITING THE BLOGPOST SECTIONS, WHETHER ON THE HOME PAGE OR DASHBOARD PAGE

// Update Post Routes for the dashboard
router.get('/update-post/:id', withAuth, async (req, res) => {
  try {
      const postData = await BlogPost.findByPk(req.params.id);
      const post = postData.get({ plain: true });
      res.render('dashboard', {
        post,
        dashboard: true,
        logged_in: req.session.logged_in, 
        updatePost: true});
    } catch (err) {
      res.status(500).json(err);
    }
});

// Edit Post Routes on the home page 
router.get('/edit-post/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id);
    const post = postData.get({ plain: true });
    res.render('home', {
      post,
      home: true,
      editPost: true,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update Post Route for both the home and dashboard pages
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
      res.redirect('/api/blog/dashboard');
    } else {
      res.status(404).json({ message: 'No post found with this id or no update made!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;