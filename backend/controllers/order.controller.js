import prisma from '../lib/prisma.js';
export async function createOrder(req, res) {
  const userId = req.user.id;
  const { cart_id, address_id, payment_method, delivery_instructions, schedule, use_wallet } = req.body;
  // For simplicity, fetch cart by user
  const cart = await prisma.cart.findFirst({ where: { userId } });
  if (!cart || (cart.items || []).length === 0) return res.status(400).json({ error: { code: 'EMPTY_CART', message: 'Cart is empty', status: 400 } });
  // check address
  const address = await prisma.address.findUnique({ where: { id: address_id } });
  if (!address) return res.status(400).json({ error: { code: 'INVALID_ADDRESS', message: 'Address not found', status: 400 } });
  // price re-calculation (trust server)
  const order = await prisma.order.create({ data: { userId, restaurantId: cart.restaurantId, items: cart.items, amounts: { sub_total: cart.subTotal, delivery_charge: cart.deliveryCharge, discount: cart.discount, grand_total: cart.grandTotal }, status: 'pending' } });
  // Optionally return payment info to client
  return res.status(201).json({ order_id: order.id, status: order.status, amount_due: order.amounts.grand_total || cart.grandTotal, payment: { provider: 'mock', payment_id: null, payment_url: null } });
}

export async function getOrder(req, res) {
  const userId = req.user.id;
  const { order_id } = req.params;
  const order = await prisma.order.findUnique({ where: { id: order_id } });
  if (!order) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Order not found', status: 404 } });
  if (order.userId !== userId) return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Access denied', status: 403 } });
  return res.json(order);
}

export async function listOrders(req, res) {
  const userId = req.user.id;
  const { page = 1, limit = 20 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const total = await prisma.order.count({ where: { userId } });
  const data = await prisma.order.findMany({ where: { userId }, skip, take: Number(limit), orderBy: { createdAt: 'desc' } });
  return res.json({ meta: { page: Number(page), limit: Number(limit), total }, data });
}

export async function cancelOrder(req, res) {
  const userId = req.user.id;
  const { order_id } = req.params;
  const { reason } = req.body;
  const order = await prisma.order.findUnique({ where: { id: order_id } });
  if (!order) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Order not found', status: 404 } });
  if (order.userId !== userId) return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Access denied', status: 403 } });
  if (order.status === 'out_for_delivery' || order.status === 'delivered') return res.status(409).json({ error: { code: 'CANNOT_CANCEL', message: 'Cannot cancel at this stage', status: 409 } });
  const updated = await prisma.order.update({ where: { id: order_id }, data: { status: 'cancelled' } });
  return res.json({ status: 'cancelled' });
}
