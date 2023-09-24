const User = require('../models/userModel');

const verifyOTP = async (req, res) => {
  const { email, password, name, phoneNumber, otp } = req.body;
  console.log(email, password, name, phoneNumber, otp , 'data');

  try {
    const user = new User({ email, password, name, phoneNumber, otp });

    if (user.otp === otp) {
      //If the OTP is valid, register the user
      await user.save();

      return res.json({ message: 'User registered successfully' });
    } else {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

const showOTPForm = (req, res) => {
  const { email, phoneNumber, name, password } = req.query;
  res.render('otp', { email, phoneNumber, name, password });
};

module.exports = { verifyOTP, showOTPForm };
