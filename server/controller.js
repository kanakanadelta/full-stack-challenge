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
        if(users) {
          res.status(200).send(users)
        } else {
          res.status(404).send('user retrieval error');
        }
      })
      .catch(err=> res.status(404).send(err));
    }
  }
}