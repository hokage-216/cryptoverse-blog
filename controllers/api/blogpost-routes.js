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

router.post('/add-comment/', withAuth, async (req, res) => {
  try {
      const { content, postId } = req.body;
      const commentData = await Comment.create({ 
        content: content, 
        user_id: req.session.user_id, 
        post_id: postId 
      });
      res.status(200).json({message: commentData});
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

// Update Post Route for dashboard page
router.put('/edit-post/:id', withAuth, async (req, res) => {
  try {
    const updateResult = await BlogPost.update({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    }, {
      where: {
        id: req.params.id
      }
    });

    // Check if any rows were updated
    if (updateResult[0] > 0) {
      res.status(200).json({ message: 'Post updated successfully!' });
    } else {
      res.status(404).json({ message: 'No post found with this ID or no update made.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating post.' });
  }
});

//Delete Post Route for Dashboard page
router.delete('/delete-post/:id', withAuth, async (req, res) => {
  try {
    const deleteResult = await BlogPost.destroy({
      where: { id: req.params.id }
    });

    // Check if any rows were deleted
    if (deleteResult > 0) {
      res.status(200).json({ message: 'Post removed successfully!' });
    } else {
      res.status(404).json({ message: 'No post found with this ID.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing post.' });
  }
});

module.exports = router;