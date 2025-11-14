import api from "./axios";

export const getCart = () => api.get("/cart");

export const updateCartItem = (cartItemId, data) =>
  api.put(`/cart/items/${cartItemId}`, data);

export const removeCartItem = (cartItemId) =>
  api.delete(`/cart/items/${cartItemId}`);

export const applyCoupon = (coupon) =>
  api.post("/cart/coupons", { coupon_code: coupon });

export const clearCart = () =>
  api.delete("/cart");
