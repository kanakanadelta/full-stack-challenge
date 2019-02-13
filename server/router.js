const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/allUsers')
  .get(controller.allUsers.get)

router
  .route('/login/:username')
  .get(controller.login.get)

router 
  .route('/user/:id')
  .get(controller.getOne.get)

router
  .route('/review')
  .post(controller.review.post)

module.exports = router;