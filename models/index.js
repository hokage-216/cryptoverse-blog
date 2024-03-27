const BlogPost = require('./BlogPost');
const User = require('./User');
const Feed = require('./Feed');

BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.belongsToMany(BlogPost, {
    through: Feed,
    foreignKey: 'user_id',
    otherKey: 'blogpost_id' ,
});

module.exports = { User, BlogPost, Feed };