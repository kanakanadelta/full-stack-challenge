const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/allUsers')
  .get(controller.allUsers.get)


module.exports = router;