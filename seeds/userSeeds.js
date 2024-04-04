const { User } = require('../models');

const userData = [
  {
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'password1234', 
  },
  {
    username: 'jane_doe',
    email: 'jane.doe@example.com',
    password: 'password1234', 
  },
];

const seedUsers = async () => User.bulkCreate(userData, {
  individualHooks: true,
});

module.exports = seedUsers;
