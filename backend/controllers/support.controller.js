import prisma from '../lib/prisma.js';
export async function createTicket(req, res) {
  const userId = req.user ? req.user.id : null;
  const { order_id, issue_type, message } = req.body;
  if (!issue_type || !message) return res.status(400).json({ error: { code: 'INVALID_PAYLOAD', message: 'issue_type and message required', status: 400 } });
  // For demo we just return a ticket id
  return res.status(201).json({ ticket_id: `tic_${Date.now()}` });
}
