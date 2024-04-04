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
];

const seedBlogPosts = () => BlogPost.bulkCreate(blogpostData);

module.exports = seedBlogPosts;
