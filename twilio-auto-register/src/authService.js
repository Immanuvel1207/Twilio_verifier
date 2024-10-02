// authService.js
import { auth } from './firebase';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

// Function to send OTP
export const sendOTP = (phoneNumber) => {
  const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

// Function to verify OTP
export const verifyOTP = (phoneNumber, code) => {
  return auth.signInWithPhoneNumber(phoneNumber, code);
};
