import api from "./axios";

export const fetchItem = (id) => api.get(`/items/${id}`);

export const addToCart = (payload) =>
  api.post("/cart/items", payload);

export const getItemDetails = (item_id) =>
  api.get(`/items/${item_id}`);