const router = require('express').Router();
const authController = require("../controller/authController")
const fileController = require("../controller/fileController")

// Files
router.get('/ecg/:id', authController.Auth,fileController.GetCertFile)
//router.get('/334Ftt2a00rtp/cert/:id', fileController.GetCertFile)
//router.get('/qrcode/:id/:fileID',authController.Auth, fileController.GetQrCode)

module.exports = router