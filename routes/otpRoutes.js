const express = require('express');
const otpController = require('../controllers/otpController');
const router = express.Router();

router.get('/verify', otpController.showOTPForm);


router.post('/verify', otpController.verifyOTP);

module.exports = router;
