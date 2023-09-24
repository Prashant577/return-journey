const User = require('../models/userModel');
const otpService = require('../services/otpService');
const twilioService = require('../services/twilioService');
const axios = require('axios');

const showRegistrationForm = (req, res) => {
  res.render('register');
};

const registerUser = async (req, res) => {
  const { email, password, name, phoneNumber } = req.body;

  try {
    // My abstract api string for validating ip address
    const response = await axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=ecc16276bcfa4ea3beccddb659b1404b');
    const country = response.data.country;

    if (country === 'India') {
      // Allow registration only for users from India
      const otp = otpService.generateOTP();

      await twilioService.sendOTP(phoneNumber, otp);

      // Redirect to the OTP input page after registration
      res.redirect(`/otp/verify?email=${email}&password=${password}&name=${name}&phoneNumber=${phoneNumber}&otp=${otp}`);
    } else {
      return res.status(400).json({ error: 'Registration not allowed from your location' });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

module.exports = { showRegistrationForm, registerUser };
