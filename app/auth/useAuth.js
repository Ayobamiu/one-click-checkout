import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import jwt_decode from "jwt-decode";
import { clearAll, remove } from "../utility/cache";
import SelectedStoreContext from "../contexts/selectedStore/context";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const { selectedStore, setSelectedStore } = useContext(SelectedStoreContext);

  const logIn = (token) => {
    var user = jwt_decode(token);
    setUser(user);
    authStorage.storeAuthToken(token);
  };
  const logOut = async () => {
    await clearAll();
    authStorage.removeToken();
    setSelectedStore(null);
    await remove("selectedStore");
    setTimeout(() => {
      setUser(null);
    }, 200);
  };
  return { logIn, logOut, setUser, user };
};
export default useAuth;
