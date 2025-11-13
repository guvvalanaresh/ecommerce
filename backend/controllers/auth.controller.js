import prisma from '../lib/prisma.js';
import { sign } from '../lib/jwt.js';
import { v4 as uuidv4 } from 'uuid';
import config from '../config/index.js';

// In-memory OTP store for demo. Replace with Redis in production.
const otpStore = new Map();

export async function requestOtp(req, res) {
  const { phone, channel } = req.body;
  if (!phone) return res.status(400).json({ error: { code: 'INVALID_PAYLOAD', message: 'phone required', status: 400 } });
  const sessionId = uuidv4();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(sessionId, { phone, otp, expiresAt: Date.now() + config.otpExpiry * 1000 });
  // TODO: integrate SMS provider to send `otp` to `phone` via `channel`.
  console.log('DEBUG OTP for', phone, otp);
  return res.json({ status: 'ok', message: 'OTP sent (mock)', otp_session_id: sessionId, expires_in: config.otpExpiry });
}

export async function verifyOtp(req, res) {
  const { otp_session_id, otp, device_info } = req.body;
  if (!otp_session_id || !otp) return res.status(400).json({ error: { code: 'INVALID_PAYLOAD', message: 'session and otp required', status: 400 } });
  const session = otpStore.get(otp_session_id);
  if (!session) return res.status(401).json({ error: { code: 'INVALID_SESSION', message: 'session not found or expired', status: 401 } });
  if (session.expiresAt < Date.now()) { otpStore.delete(otp_session_id); return res.status(401).json({ error: { code: 'OTP_EXPIRED', message: 'OTP expired', status: 401 } }); }
  if (session.otp !== otp) return res.status(401).json({ error: { code: 'INVALID_OTP', message: 'Invalid OTP', status: 401 } });
  // find or create user
  let user = await prisma.user.findUnique({ where: { phone: session.phone } });
  if (!user) {
    user = await prisma.user.create({ data: { phone: session.phone } });
  }
  const token = sign({ id: user.id, phone: user.phone });
  otpStore.delete(otp_session_id);
  return res.json({ status: 'ok', user: { id: user.id, name: user.name, phone: user.phone }, access_token: token, expires_in: Number(process.env.JWT_EXPIRES_IN || 3600) });
}
