import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET = process.env.JWT_SECRET || 'change_me';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '3600';
export function sign(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}
export function verify(token) {
  return jwt.verify(token, SECRET);
}
