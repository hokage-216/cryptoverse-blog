const sequelize = require('./sequelize-connection.js');

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
      }
};

const syncTables = async () => {
    try {
        await sequelize.sync({ force: true });
        await testConnection();
        console.log("All models were synchronized successfully.");
        process.exit(0);
    } catch (error) {
        console.error('Failed to synchronize models:', error);
        process.exit(1);
    }
}

syncTables();

module.exports = syncTables;