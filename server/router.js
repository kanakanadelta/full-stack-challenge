const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/allUsers')
  .get(controller.allUsers.get)

router
  .route('/login/:username')
  .get(controller.login.get)


module.exports = router;