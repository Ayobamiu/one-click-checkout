import storage from "../auth/storage";
import apiClient from "./client";
import jwt_decode from "jwt-decode";

const withdraw = async (data, onUploadProgress) => {
  const token = await storage.getToken();
  var user = jwt_decode(token);
  const selectedStore = user.stores[0];
  let transaction = {};
  let err = false;

  try {
    const result = await apiClient.post(
      "withdraw",
      { ...data, store: selectedStore },
      {
        onUploadProgress: (progressEvent) => {
          onUploadProgress(progressEvent.loaded / progressEvent.total);
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    transaction = result.data.transaction;
  } catch (error) {
    err = true;
  }
  return { transaction, error: err };
};

export default {
  withdraw,
};
