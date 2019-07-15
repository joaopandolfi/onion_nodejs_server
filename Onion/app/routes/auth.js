const router = require('express').Router();
const authController = require("../controller/authController")

router.post('/login', authController.Login)
router.all('/logout', authController.Logout)
router.get('/*', authController.CheckAuth)
router.get('/login', authController.RedirectLogin)
router.get('/forbidden', authController.Forbidden)

module.exports = router