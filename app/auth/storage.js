import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";

const key = "authToken";
async function storeAuthToken(authToken) {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.warn("Error storing authToken", error);
  }
}

async function getToken() {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.warn("Error getting authToken");
  }
}
async function getUser() {
  const token = await getToken();
  return token ? jwt_decode(token) : null;
}

async function removeToken() {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.warn("Error removing authToken");
  }
}




export default {
  storeAuthToken,
  getToken,
  removeToken,
  getUser,
};
