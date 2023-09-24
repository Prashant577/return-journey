const twilio = require('twilio');
const User = require('../models/userModel');

const TWILIO_ACCOUNT_SID = 'AC85ffb17f1689018dad60e422d03bc290';
const TWILIO_AUTH_TOKEN = '39d528f74a86e40bd7a8d4cac5ac1e4e';
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendOTP = async (phoneNumber, otp) => {
  try {
    await twilioClient.messages.create({
      body: `Your OTP is: ${otp}`,
      from: '+14245436825', 
      to: '+91'+phoneNumber, 
    });
    console.log('OTP sent successfully');
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

module.exports = { sendOTP };
