import storage from "../auth/storage";
import apiClient from "./client";
import jwt_decode from "jwt-decode";
import { get } from "../utility/cache";

const updateOrder = async (data, orderId, onUploadProgress) => {
  let order = {};
  let err = false;

  try {
    const result = await apiClient.patch(
      `products/${orderId}/update-order`,
      data,
      {
        onUploadProgress: (progressEvent) => {
          onUploadProgress(progressEvent.loaded / progressEvent.total);
        },
      }
    );
    order = result.data;
  } catch (error) {
    if (error !== "") {
      err = true;
    }
  }
  return { order, error: err };
};
const deleteProduct = async (productId, onUploadProgress) => {
  let product = {};
  let err = false;
  try {
    const result = await apiClient.delete(`products/${productId}/remove`, {
      onUploadProgress: (progressEvent) => {
        onUploadProgress(progressEvent.loaded / progressEvent.total);
      },
    });
    product = result.data;
  } catch (error) {
    if (error !== "") {
      err = true;
    }
  }
  return { product, error: err };
};
const updateProduct = async (data, productId, onUploadProgress) => {
  let product = {};
  let err = false;

  try {
    const result = await apiClient.patch(`products/${productId}/update`, data, {
      onUploadProgress: (progressEvent) => {
        onUploadProgress(progressEvent.loaded / progressEvent.total);
      },
    });
    product = result.data;
  } catch (error) {
    if (error !== "") {
      err = true;
    }
  }
  return { product, error: err };
};
const addProduct = async (data, onUploadProgress) => {
  const token = await storage.getToken();
  let product = {};
  let err = false;
  const formData = new FormData();
  if (data.images && data.images.length > 0) {
    for (let index = 0; index < data.images.length; index++) {
      const image = data.images[index];
      formData.append("images", {
        ...image,
        name: `image${index}.jpg`,
      });
    }
  }
  // if (data.images) {
  //   formData.append("images", data.images);
  // }
  if (data.features) {
    formData.append("features", JSON.stringify(data.features));
  }
  if (data.video) {
    formData.append("video", data.video);
  }
  if (data.title) {
    formData.append("title", data.title);
  }
  if (data.description) {
    formData.append("description", data.description);
  }
  if (data.price) {
    formData.append("price", Number(data.price));
  }
  if (data.numberInStock) {
    formData.append("numberInStock", data.numberInStock);
  }
  if (data.isAssured) {
    formData.append("isAssured", data.isAssured);
  }
  if (data.returnable) {
    formData.append("returnable", data.returnable);
  }
  if (data.store) {
    formData.append("store", data.store);
  }

  try {
    const result = await apiClient.post("products/add", formData, {
      onUploadProgress: (progressEvent) => {
        onUploadProgress(progressEvent.loaded / progressEvent.total);
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    product = result.data;
  } catch (error) {
    if (error !== "") {
      err = true;
    }
  }
  return { product, error: err };
};
const addProductImage = async (name, file, productId) => {
  let product = {};
  let err = false;
  const formData = new FormData();
  formData.append(name, file);
  try {
    const result = await apiClient.patch(
      `products/add-image/${productId}`,
      formData
    );
    product = result.data;
  } catch (error) {
    if (error !== "") {
      err = true;
    }
  }
  return { product, error: err };
};
const deleteProductImage = async (imageId, productId) => {
  let product = {};
  let err = false;

  try {
    const result = await apiClient.patch(
      `products/remove-image/${productId}/${imageId}`
    );
    product = result.data;
  } catch (error) {
    if (error !== "") {
      err = true;
    }
  }
  return { product, error: err };
};
const getStores = async () => {
  const token = await storage.getToken();
  let stores = [];
  let err = false;
  try {
    const result = await apiClient.get("/store", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    stores = result?.data?.error ? [] : result.data;
  } catch (error) {
    if (error !== "") {
      err = true;
    }
  }
  return { error: err, stores };
};
const getStore = async () => {
  const token = await storage.getToken();
  var user = jwt_decode(token);
  const selectedStore = user.stores[0];
  let eStore = {};
  let err = false;
  try {
    const result = await apiClient.get("/products/store/" + selectedStore);
    eStore = result.data.store;
  } catch (error) {
    if (error !== "") {
      err = true;
    }
  }
  return { error: err, store: eStore };
};
const getProducts = async () => {
  const selectedStore = await get("selectedStore");
  let products = [];
  let err = false;
  try {
    const result = await apiClient.get(
      "/products/store/products/" + selectedStore._id
    );
    products = result?.data?.products;
  } catch (error) {
    if (error !== "") {
      err = true;
    }
  }
  return { products, error: err };
};
const getTransactions = async () => {
  const selectedStore = await get("selectedStore");
  let transactions = [];
  try {
    const { data } = await apiClient.get(
      `/store/transactions?store=${selectedStore?._id}`
    );
    transactions = data;
  } catch (error) {}
  return transactions;
};
const getOrders = async () => {
  const selectedStore = await get("selectedStore");
  let orders = [];
  let err = false;
  try {
    const { data } = await apiClient.get(`/store/orders/${selectedStore._id}`);
    orders = data;
  } catch (error) {
    err = true;
  }
  return { orders, error: err };
};

export default {
  getProducts,
  addProduct,
  getTransactions,
  getOrders,
  getStore,
  addProductImage,
  deleteProductImage,
  updateOrder,
  updateProduct,
  getStores,
  deleteProduct,
};
