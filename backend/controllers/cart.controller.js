import prisma from '../lib/prisma.js';
export async function getCart(req, res) {
  const userId = req.user.id;
  let cart = await prisma.cart.findFirst({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId, restaurantId: '', items: [], subTotal: 0, deliveryCharge: 0, discount: 0, grandTotal: 0 } });
  }
  return res.json(cart);
}

export async function addItem(req, res) {
  const userId = req.user.id;
  const { restaurant_id, item_id, quantity = 1, modifiers = [], notes } = req.body;
  if (!restaurant_id || !item_id) return res.status(400).json({ error: { code: 'INVALID_PAYLOAD', message: 'restaurant_id and item_id required', status: 400 } });
  let cart = await prisma.cart.findFirst({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId, restaurantId: restaurant_id, items: [], subTotal: 0, deliveryCharge: 0, discount: 0, grandTotal: 0 } });
  }
  if (cart.restaurantId && cart.restaurantId !== restaurant_id) return res.status(409).json({ error: { code: 'CONFLICT', message: 'Cart contains items from another restaurant', status: 409, details: [{ field: 'cart.restaurant_id', reason: 'different_restaurant' }] } });
  // get item price
  const item = await prisma.menuItem.findUnique({ where: { id: item_id } });
  if (!item) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Item not found', status: 404 } });
  const cartItems = cart.items || [];
  const cartItemId = `ci_${Date.now()}`;
  const itemTotal = item.price * quantity;
  cartItems.push({ cart_item_id: cartItemId, item_id, name: item.name, qty: quantity, base_price: item.price, modifiers, total_price: itemTotal, notes });
  const subTotal = cartItems.reduce((s, it) => s + it.total_price, 0);
  const deliveryCharge = 30;
  const grandTotal = subTotal + deliveryCharge - (cart.discount || 0);
  const updated = await prisma.cart.update({ where: { id: cart.id }, data: { items: cartItems, subTotal, deliveryCharge, grandTotal, restaurantId: restaurant_id } });
  return res.status(201).json({ status: 'created', cart_item_id: cartItemId, cart_total: updated.grandTotal });
}

export async function updateCartItem(req, res) {
  const userId = req.user.id;
  const { cart_item_id } = req.params;
  const { quantity, modifiers, notes } = req.body;
  const cart = await prisma.cart.findFirst({ where: { userId } });
  if (!cart) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Cart not found', status: 404 } });
  const items = cart.items || [];
  const idx = items.findIndex(i => i.cart_item_id === cart_item_id);
  if (idx === -1) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Cart item not found', status: 404 } });
  if (quantity) items[idx].qty = quantity;
  if (modifiers) items[idx].modifiers = modifiers;
  if (notes !== undefined) items[idx].notes = notes;
  // recompute price (simple recompute based on base_price)
  items[idx].total_price = items[idx].base_price * items[idx].qty;
  const subTotal = items.reduce((s, it) => s + it.total_price, 0);
  const deliveryCharge = cart.deliveryCharge;
  const grandTotal = subTotal + deliveryCharge - (cart.discount || 0);
  const updated = await prisma.cart.update({ where: { id: cart.id }, data: { items, subTotal, grandTotal } });
  return res.json(updated);
}

export async function removeCartItem(req, res) {
  const userId = req.user.id;
  const { cart_item_id } = req.params;
  const cart = await prisma.cart.findFirst({ where: { userId } });
  if (!cart) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Cart not found', status: 404 } });
  const items = (cart.items || []).filter(i => i.cart_item_id !== cart_item_id);
  const subTotal = items.reduce((s, it) => s + it.total_price, 0);
  const grandTotal = subTotal + cart.deliveryCharge - (cart.discount || 0);
  const updated = await prisma.cart.update({ where: { id: cart.id }, data: { items, subTotal, grandTotal } });
  return res.json(updated);
}

export async function applyCoupon(req, res) {
  const userId = req.user.id;
  const { coupon_code } = req.body;
  if (!coupon_code) return res.status(400).json({ error: { code: 'INVALID_PAYLOAD', message: 'coupon_code required', status: 400 } });
  const coupon = await prisma.coupon.findUnique({ where: { code: coupon_code } });
  if (!coupon) return res.status(400).json({ error: { code: 'INVALID_COUPON', message: 'Coupon not found', status: 400 } });
  const cart = await prisma.cart.findFirst({ where: { userId } });
  if (!cart) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Cart not found', status: 404 } });
  if (cart.subTotal < (coupon.minOrder || 0)) return res.status(422).json({ error: { code: 'COUPON_NOT_APPLICABLE', message: 'Min order not met', status: 422 } });
  const discount = coupon.discount;
  const newGrandTotal = cart.subTotal + cart.deliveryCharge - discount;
  const updated = await prisma.cart.update({ where: { id: cart.id }, data: { discount, grandTotal: newGrandTotal } });
  return res.json({ status: 'applied', discount_amount: discount, new_grand_total: updated.grandTotal });
}

export async function clearCart(req, res) {
  const userId = req.user.id;
  const cart = await prisma.cart.findFirst({ where: { userId } });
  if (!cart) return res.json({ status: 'cleared' });
  await prisma.cart.delete({ where: { id: cart.id } });
  return res.json({ status: 'cleared' });
}
