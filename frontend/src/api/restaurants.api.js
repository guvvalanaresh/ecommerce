import api from "./axios";

export const getRestaurants = () => api.get("/restaurants");
export const getRestaurant = (id) => api.get(`/restaurants/${id}`);
export const getMenu = (id) => api.get(`/restaurants/${id}/menu`);

export const fetchRestaurant = (id) =>
  api.get(`/restaurants/${id}`);

export const fetchMenu = (id) =>
  api.get(`/restaurants/${id}/menu`);