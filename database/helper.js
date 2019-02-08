const usersData = require('../assets/usersData.json');

const Sequelize = require('sequelize');

const {
  Users
} = require('./models.js');

const insertUsers = (usersData) => {
  let counter = 0;
  usersData.forEach(userData => {
    Users.create({
      id: userData.id,
      admin: userData.admin,
      username: userData.username,
      password: userData.password,
      first_name: userData.first_name,
      last_name: userData.last_name
    })
    .then(user => {
      counter++;
      console.log("Mock user loaded to DB", counter, user.dataValues);
    })
  });
}

insertUsers(usersData);