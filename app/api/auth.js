import apiClient from "./client";

const login = (email, password) =>
  apiClient.post("/auth-lite/login", { email, password });
const signUp = (data) => apiClient.post("/auth-lite", { ...data });
const checkAvailableUserName = (userName) =>
  apiClient.post("/auth-lite/check", { userName });

export default {
  checkAvailableUserName,
  login,
  signUp,
};
