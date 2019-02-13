const Sequelize = require('sequelize');

const {
  Users,
  Feedbacks,
  Reviews
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
  },
  review: {
    post: (req, res) => {
      console.log('in POST');
      console.log(req.query)
      const {comment, userReviewed, reviewer} = req.query;
      Reviews
        .create({
          comment: comment,
          userReviewed: userReviewed,
          reviewer: reviewer
        })
        .then(review=> {
          res.status(201).send(review);
        })
        .catch(err=> {
          res.status(404).send(err);
        })
    }
  },
  getOne: {
    get: (req, res) => {
      console.log('GET 1 User');
      Users
        .findOne({
          where: {
            id: req.query.id
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