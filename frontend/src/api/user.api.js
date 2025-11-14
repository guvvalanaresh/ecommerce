import api from "./axios";

export const getProfile = () => api.get("/users/me");

export const updateProfile = (data) => api.put("/users/me", data);

export const getAddresses = () => api.get("/users/me/addresses");

export const addAddress = (data) => api.post("/users/me/addresses", data);

export const updateAddress = (address_id, data) =>
  api.put(`/users/me/addresses/${address_id}`, data);

export const deleteAddress = (address_id) =>
  api.delete(`/users/me/addresses/${address_id}`);
