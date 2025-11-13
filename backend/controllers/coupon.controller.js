import prisma from '../lib/prisma.js';
export async function listCoupons(req, res) {
  const { restaurant_id } = req.query;
  const where = {};
  if (restaurant_id) where['restaurantId'] = restaurant_id;
  const coupons = await prisma.coupon.findMany({ where });
  return res.json(coupons);
}

export async function claimCoupon(req, res) {
  const userId = req.user.id;
  const { coupon_code } = req.body;
  const coupon = await prisma.coupon.findUnique({ where: { code: coupon_code } });
  if (!coupon) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Coupon not found', status: 404 } });
  // In real app, create user-coupon relation; here we just return success
  return res.status(201).json({ status: 'claimed', coupon: coupon.code });
}
