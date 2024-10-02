const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const accountSid = 'AC39845ecc63085bb5a8aa57f3efd21fa4';
const authToken = 'ba88038df55ad7ffb8609c26bb2a19dd';
const verifyServiceSid = 'VAe5a071edb4acd051aa1f679a4e9ab049';
const client = new twilio(accountSid, authToken);

// Send OTP to new user
app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  
  try {
    const verification = await client.verify.v2.services(verifyServiceSid)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });
    res.status(200).send({ message: 'OTP sent', status: verification.status });
  } catch (error) {
    res.status(500).send({ error: 'Failed to send OTP' });
  }
});

// Verify OTP
app.post('/verify-otp', async (req, res) => {
  const { phoneNumber, code } = req.body;
  
  try {
    const verificationCheck = await client.verify.v2.services(verifyServiceSid)
      .verificationChecks
      .create({ to: phoneNumber, code: code });

    if (verificationCheck.status === 'approved') {
      res.status(200).send({ message: 'OTP verified successfully', verified: true });
    } else {
      res.status(400).send({ message: 'Invalid OTP', verified: false });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to verify OTP' });
  }
});

// Send Message
app.post('/send-message', async (req, res) => {
  const { phoneNumber, messageBody } = req.body;

  try {
    const message = await client.messages.create({
      body: messageBody,
      from: '+15862104353', // Your Twilio number
      to: phoneNumber,
    });
    res.status(200).send({ message: 'Message sent', sid: message.sid });
  } catch (error) {
    res.status(500).send({ error: 'Failed to send message' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
