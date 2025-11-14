import api from "./axios";

export const fetchAddresses = () => api.get("/users/me/addresses");

export const placeOrder = (payload) =>
  api.post("/orders", payload);
