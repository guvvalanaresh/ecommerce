import prisma from '../lib/prisma.js';
export async function getProfile(req, res) {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { addresses: true } });
  if (!user) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'User not found', status: 404 } });
  return res.json({ id: user.id, name: user.name, phone: user.phone, email: user.email, wallet_balance: user.walletBalance });
}

export async function updateProfile(req, res) {
  const userId = req.user.id;
  const { name, email } = req.body;
  const updated = await prisma.user.update({ where: { id: userId }, data: { name, email } });
  return res.json({ id: updated.id, name: updated.name, email: updated.email, phone: updated.phone });
}

export async function listAddresses(req, res) {
  const userId = req.user.id;
  const addresses = await prisma.address.findMany({ where: { userId } });
  return res.json(addresses);
}

export async function addAddress(req, res) {
  const userId = req.user.id;
  const data = req.body;
  const created = await prisma.address.create({ data: { ...data, userId } });
  return res.status(201).json(created);
}

export async function updateAddress(req, res) {
  const userId = req.user.id;
  const { address_id } = req.params;
  const updated = await prisma.address.updateMany({ where: { id: address_id, userId }, data: req.body });
  if (updated.count === 0) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Address not found', status: 404 } });
  const address = await prisma.address.findUnique({ where: { id: address_id } });
  return res.json(address);
}

export async function deleteAddress(req, res) {
  const userId = req.user.id;
  const { address_id } = req.params;
  await prisma.address.deleteMany({ where: { id: address_id, userId } });
  return res.status(204).send();
}

export async function getWallet(req, res) {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return res.json({ balance: user.walletBalance, transactions: [] });
}
