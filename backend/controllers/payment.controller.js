import prisma from '../lib/prisma.js';
export async function verifyPayment(req, res) {
  const { order_id, payment_provider, provider_payload } = req.body;
  if (!order_id) return res.status(400).json({ error: { code: 'INVALID_PAYLOAD', message: 'order_id required', status: 400 } });
  const order = await prisma.order.findUnique({ where: { id: order_id } });
  if (!order) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Order not found', status: 404 } });
  // For mock, mark confirmed
  await prisma.order.update({ where: { id: order_id }, data: { status: 'confirmed' } });
  return res.json({ status: 'confirmed' });
}
