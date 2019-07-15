const router = require('express').Router();
const ecgController = require('../controller/ecgController')
const authController = require("../controller/authController")

router.get('/', authController.Auth, ecgController.Get)
router.post('/', authController.Auth, ecgController.NewReport)


module.exports = router