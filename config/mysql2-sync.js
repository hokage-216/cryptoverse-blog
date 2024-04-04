const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  });

const setupDatabase = async () => {
    try {

        // Drop then create the database

        await pool.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
        console.log('\nSTATUS:: Database Dropped');

        await pool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
        console.log('\nSTATUS:: Database Created');

        await pool.query(`USE ${process.env.DB_NAME}`);
        console.log('\nSTATUS:: Database Created');

        // Create the tables for user, blogpost, and comments

        await pool.query(`
        CREATE TABLE IF NOT EXISTS user (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
        console.log('\nSTATUS:: User Table Created');

        await pool.query(`
        CREATE TABLE IF NOT EXISTS blogpost (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          textbox TEXT NOT NULL,
          user_id INT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
        )
      `);
        console.log('\nSTATUS:: Blog Post Table Created');

        await pool.query(`
        CREATE TABLE IF NOT EXISTS comment (
          id INT AUTO_INCREMENT PRIMARY KEY,
          content TEXT NOT NULL,
          blogpost_id INT,
          user_id INT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (blogpost_id) REFERENCES blogpost(id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
        )
      `);
        console.log('\nSTATUS:: Comment Table Created');

        // Seed the database

        await pool.query(`
        INSERT INTO user (username, email, password) VALUES
        ('john_doe', 'john.doe@example.com', '$2b$10$XUQdJGdXrhFrMc.RF6iWdOXo2TxgHpNa2l6w.xoPc64ly5NaM4.eC'),
        ('jane_doe', 'jane.doe@example.com', '$2b$10$2/iq0DJ87AFcoWpgf4sQ7.SGgBuIvRnyz4g51.qqV/2RHRztCULN.')
      `);
        console.log('\nSTATUS:: Users Seeded');

        await pool.query(`
        INSERT INTO blogpost (title, textbox, user_id) VALUES
        ('First Blog Post', 'This is the content of the first blog post.', 1),
        ('Second Blog Post', 'This is the content of the second blog post.', 1)
      `);
        console.log('\nSTATUS:: Blog Posts Seeded');

        await pool.query(`
        INSERT INTO comment (content, blogpost_id, user_id) VALUES
        ('This is a comment on the first blog post.', 1, 2),
        ('This is another comment on the first blog post.', 1, 1)
      `);
        console.log('\nSTATUS:: Comments Seeded\n');
        
        //Exit the program
        process.exit(0);

    } catch (error) {
        console.log('\nERROR:: \n', error);
        process.exit(1);
    }
}

setupDatabase();

module.exports = setupDatabase;
