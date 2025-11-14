import api from "./axios";

export const fetchItem = (id) => api.get(`/items/${id}`);

export const addToCart = (payload) =>
  api.post("/cart/items", payload);
