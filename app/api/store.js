import { useContext } from "react";
import storage from "../auth/storage";
import apiClient from "./client";

const addStore = async (data, onUploadProgress) => {
  const token = await storage.getToken();
  let store = {};
  let err = false;
  const formData = new FormData();

  if (data.location) {
    formData.append("location", JSON.stringify(data.location));
  }
  if (data.allowPickup) {
    formData.append("allowPickup", data.allowPickup);
  }
  if (data.banner) {
    formData.append("banner", data.banner);
  }

  if (data.description) {
    formData.append("description", data.description);
  }
  if (data.logo) {
    formData.append("logo", data.logo);
  }
  if (data.name) {
    formData.append("name", data.name);
  }
  if (data.phoneOne) {
    formData.append("phoneOne", data.phoneOne);
  }
  if (data.phoneTwo) {
    formData.append("phoneTwo", data.phoneTwo);
  }

  try {
    const result = await apiClient.post("products/store", formData, {
      onUploadProgress: (progressEvent) => {
        onUploadProgress(progressEvent.loaded / progressEvent.total);
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    store = result.data;
  } catch (error) {
    err = true;
  }
  return { store, error: err };
};
const updateStore = async (data, storeId, onUploadProgress) => {
  let store = {};
  let err = false;

  try {
    const result = await apiClient.patch(`products/store/${storeId}`, data, {
      onUploadProgress: (progressEvent) => {
        onUploadProgress(progressEvent.loaded / progressEvent.total);
      },
    });
    store = result.data;
  } catch (error) {
    err = true;
  }
  return { store, error: err };
};
const updateStoreMedia = async (data, storeId, onUploadProgress) => {
  let store = {};
  let err = false;
  const formData = new FormData();
  if (data.logo) {
    formData.append("logo", data.logo);
  }
  if (data.banner) {
    formData.append("banner", data.banner);
  }
  try {
    const result = await apiClient.patch(
      `products/store/${storeId}`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          onUploadProgress(progressEvent.loaded / progressEvent.total);
        },
      }
    );
    store = result.data;
  } catch (error) {
    err = true;
  }
  return { store, error: err };
};

export default { addStore, updateStore, updateStoreMedia };
