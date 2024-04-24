const { User } = require('../models');

const userData = [
  {
    username: 'user1',
    email: 'user1@example.com',
    password: 'password', 
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    password: 'password', 
  },
];

const seedUsers = () => User.bulkCreate(userData, {
  individualHooks: true,
});

module.exports = seedUsers;
