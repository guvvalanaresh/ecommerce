import api from "./axios";

export const getOrders = () => api.get("/orders");

export const getOrderDetails = (order_id) =>
  api.get(`/orders/${order_id}`);

export const cancelOrder = (order_id, reason) =>
  api.post(`/orders/${order_id}/cancel`, { reason });
