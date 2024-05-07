const withAuth = require('../../utils/auth');
const {User, BlogPost, Comment} = require('../../models');
const { Model } = require('sequelize');
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
    // obtain post data related to the clicked blog post
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          include: [{
            model: User,
            attributes: ['username']
          }],
          attributes: ['content', 'createdAt']
        }
      ],
    });

    // check if post actually exists
    if (!postData) {
      res.status(404).json({ message: 'No blog post found with this id' });
      return;
    }

    //console log the post data to ensure the correct post was selected
    console.log(postData);

    //serialize the data so we can use it
    const post = postData.get({ plain: true });

    res.render('home', {
      post,
      home: true,
      logged_in: req.session.logged_in,
      selected: true,
    })
  } catch (error) {
    res.status(500).json(error);
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