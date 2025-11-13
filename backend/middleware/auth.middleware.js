import { verify } from '../lib/jwt.js';
export default function auth(req, res, next) {
  const h = req.headers.authorization;
  if (!h || !h.startsWith('Bearer ')) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Missing Authorization header', status: 401 } });
  const token = h.split(' ')[1];
  try {
    const payload = verify(token);
    req.user = payload; // { id, phone, ... }
    return next();
  } catch (e) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid token', status: 401 } });
  }
}
