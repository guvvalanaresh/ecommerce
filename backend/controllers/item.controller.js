import prisma from '../lib/prisma.js';
export async function getItem(req, res) {
  const { item_id } = req.params;
  const item = await prisma.menuItem.findUnique({ where: { id: item_id } });
  if (!item) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Item not found', status: 404 } });
  return res.json({ ...item, nutritional: { calories: 250, protein: 10, carbs: 30, fat: 8 } });
}
