import prisma from '../lib/prisma.js';
export async function listRestaurants(req, res) {
  const { page = 1, limit = 20, q, category } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const where = {};
  if (q) where.name = { contains: q, mode: 'insensitive' };
  const total = await prisma.restaurant.count({ where });
  const data = await prisma.restaurant.findMany({ where, skip, take: Number(limit) });
  return res.json({ meta: { page: Number(page), limit: Number(limit), total }, data });
}

export async function getRestaurant(req, res) {
  const { restaurant_id } = req.params;
  const r = await prisma.restaurant.findUnique({ where: { id: restaurant_id } });
  if (!r) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Restaurant not found', status: 404 } });
  return res.json(r);
}

export async function getMenu(req, res) {
  const { restaurant_id } = req.params;
  const items = await prisma.menuItem.findMany({ where: { restaurantId: restaurant_id } });
  return res.json({ menu: [{ section: 'Menu', items }] });
}
