import storage from "../auth/storage";
import apiClient from "./client";
const register = async (expoPushToken) => {
  const token = await storage.getToken();
  apiClient.post(
    "/auth-lite/expoPushToken",
    { expoPushToken },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export default { register };
