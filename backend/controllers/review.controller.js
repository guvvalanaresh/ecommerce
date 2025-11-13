import prisma from '../lib/prisma.js';
export async function postReview(req, res) {
  const userId = req.user.id;
  const { restaurant_id } = req.params;
  const { rating, comment } = req.body;
  if (!rating) return res.status(400).json({ error: { code: 'INVALID_PAYLOAD', message: 'rating required', status: 400 } });
  const review = await prisma.review.create({ data: { userId, restaurantId: restaurant_id, rating: Number(rating), comment } });
  return res.status(201).json({ id: review.id, rating: review.rating, comment: review.comment, created_at: review.createdAt });
}

export async function listReviews(req, res) {
  const { restaurant_id } = req.params;
  const { page = 1, limit = 20 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const total = await prisma.review.count({ where: { restaurantId: restaurant_id } });
  const data = await prisma.review.findMany({ where: { restaurantId: restaurant_id }, skip, take: Number(limit), orderBy: { createdAt: 'desc' } });
  return res.json({ meta: { page: Number(page), limit: Number(limit), total }, data });
}
