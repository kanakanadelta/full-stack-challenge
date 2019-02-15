const pg = require('pg');
const Sequelize = require('sequelize');

const connection = new Sequelize('feedbox', 'postgres', 'Megumi91', {
  dialect: 'postgres'
});


connection
  .authenticate()
  .then(() => console.log('Successfully connected to the postgres database.'))
  .catch(err => console.log('Error connecting to the database...', err));

module.exports = connection;
