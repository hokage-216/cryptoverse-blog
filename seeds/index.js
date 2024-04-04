const seedUsers = require('./userSeeds');
const seedBlogPosts = require('./blogpostSeeds');
const seedComments = require('./commentSeeds');
const syncTables = require('../config/sequelize-sync');

const seedAll = async () => {
  console.log('\n----- DATABASE SYNC -----');
  await syncTables();
  console.log('\nDATABASE SYNCED');

  console.log('\n----- SEEDING USERS -----');
  await seedUsers();
  console.log('\nUSERS SEEDED');

  console.log('\n----- SEEDING BLOG POSTS -----');
  await seedBlogPosts();
  console.log('\nBLOG POSTS SEEDED')

  console.log('\n----- SEEDING COMMENTS -----');
  await seedComments();
  console.log('\nCOMMENTS SEEDED');

  console.log('\n----- SEEDING COMPLETE -----');
  
  process.exit(0); // Exit the process with a success code
};

seedAll().catch(err => {
  console.error(err);
  process.exit(1); // Exit the process with an error code
});
