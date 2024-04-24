const { BlogPost } = require('../models');

const blogpostData = [
  {
    title: 'First Blog Post',
    textbox: 'This is the content of the first blog post.',
    user_id: 1,
  },
  {
    title: 'Second Blog Post',
    textbox: 'This is the content of the second blog post.',
    user_id: 1,
  },
  {
    title: 'Third Blog Post',
    textbox: 'This is the content of the third blog post.',
    user_id: 2,
  },
  {
    title: 'Fourth Blog Post',
    textbox: 'This is the content of the fourth blog post.',
    user_id: 2,
  },
  {
    title: 'Fifth Blog Post',
    textbox: 'This is the content of the fifth blog post.',
    user_id: 3,
  },
  {
    title: 'Sixth Blog Post',
    textbox: 'This is the content of the Sixth blog post.',
    user_id: 3,
  },
];

const seedBlogPosts = () => BlogPost.bulkCreate(blogpostData);

module.exports = seedBlogPosts;
