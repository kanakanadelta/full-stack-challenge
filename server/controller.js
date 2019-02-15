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
      console.log('req.body:', req.body)
      const {comment, user_reviewed, reviewer} = req.body;
      Reviews
        .create({
          comment: comment,
          user_reviewed: user_reviewed,
          reviewer: reviewer
        })
        .then(review=> {
          res.status(201).send(review);
        })
        .catch(err=> {
          console.log('error making POST')
          res.status(404).send(err);
        })
    },
    get: (req, res) =>{
      console.log('retrieving reviews', req.query)
      const {user_id} = req.query;
      Reviews
        .findAll({
          where: {
            user_reviewed: user_id
          }
        })
        .then(reviews => {
          if (reviews) {
            res.status(200).send(reviews)
          } else {
            res.status(404).send('review retrieval error');
          }
        })
        .catch(err=> res.status(404).send(err));
    },
    delete: (req, res) => {
      const {review_id} = req.query
      Reviews
        .destroy({
          where: {
            id: review_id
          }
        })
        .then(deleted=> {
          if (deleted) {
            res.sendStatus(202).send(deleted);
            console.log('success');
          } else {
            res.status(404).send('error deleting');
          }
        })
        .catch(err=> res.status(404).send(err));
    }
  },
  getOne: {
    get: (req, res) => {
      console.log('GET 1 User');
      const { id } = req.params;
      Users
        .findOne({
          where: {
            id: id
          }
        })
        .then((user) => {
          if (user) {
            console.log(user.first_name, user.last_name)
            res.status(200).send(user)
          } else {
            res.status(500).send('user retrieval error');
          }
        })
    },
    update: (req, res) => {
      console.log('in update');
      Users
        .update({
          username: req.body.username,
          password: req.body.password,
          // first_name: req.body.first_name,
          // last_name: req.body.last_name,
          // review_auth: req.body.review_auth
        }, {where: {id: 1}})
        .then(data => {
          res.status(200).send(data)
        })
        .catch(err=> {
          res.status(404).send('err updating...', err)
        })
    }
  }
}