import dotenv from 'dotenv';
dotenv.config();
export default {
  port: process.env.PORT || 8000,
  otpExpiry: Number(process.env.OTP_EXPIRY_SECONDS || 300)
};
