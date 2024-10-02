import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [verified, setVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Send OTP
  const sendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-otp', { phoneNumber });
      if (response.data.status === 'pending') {
        setOtpSent(true);
        alert('OTP sent to your phone!');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP');
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { phoneNumber, code: otp });
      if (response.data.verified) {
        setVerified(true);
        alert('Phone number verified successfully!');
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Failed to verify OTP');
    }
  };

  // Send message
  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-message', { phoneNumber, messageBody: message });
      if (response.data.sid) {
        alert('Message sent successfully!');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  return (
    <div className="App">
      <h2>Twilio OTP Verification and Messaging</h2>

      {!otpSent && (
        <div>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      )}

      {otpSent && !verified && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}

      {verified && (
        <div>
          <input
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send Message</button>
        </div>
      )}
    </div>
  );
}

export default App;
