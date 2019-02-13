const Sequelize = require('sequelize');

const {
  Users,
  Feedbacks
} = require('../database/models.js');


module.exports = {
  allUsers: {
    get: (req, res) => {
      console.log("Employees retrieved");
      Users.findAll({})
      .then(users => {
        if (users) {
          res.status(200).send(users)
        } else {
          res.status(404).send('user retrieval error');
        }
      })
      .catch(err=> res.status(404).send(err));
    }
  },
  login: {
    get: (req, res) => {
      console.log('in LOGIN');
      const {username, password} = req.query;
      console.log(req)
      Users
      .findOne({
        where: {
          username: username
        }
      })
      .then((user) => {
        if (user) {
          console.log(user.first_name, user.last_name)
          res.status(200).send(user)
        } else {
          res.status(404).send('user retrieval error');
        }
      })
    }
  }
}