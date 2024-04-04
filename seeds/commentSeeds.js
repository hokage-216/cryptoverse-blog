const { Comment } = require('../models');

const commentData = [
  {
    content: 'This is a comment on the first blog post.',
    blogpost_id: 1,
    user_id: 2,
  },
  {
    content: 'This is another comment on the first blog post.',
    blogpost_id: 1,
    user_id: 1,
  },
];

const seedComments = async () => Comment.bulkCreate(commentData);

module.exports = seedComments;
