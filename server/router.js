const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/allUsers')
  .get(controller.allUsers.get)

router
  .route('/login')
  .get(controller.login.get)

router
  .route('/user/')
  .post(controller.getOne.post)

router 
  .route('/user/:id')
  .get(controller.getOne.get)
  .patch(controller.getOne.update)

router
  .route('/review')
  .get(controller.review.get)
  .post(controller.review.post)
  .delete(controller.review.delete)

module.exports = router;