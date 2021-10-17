import { useContext, useEffect, useState } from "react";
import productAPIS from "../api/products";
import StoreContext from "../contexts/eStore/context";
import SelectedStoreContext from "../contexts/selectedStore/context";
import StoresContext from "../contexts/stores/context";
import { store, get, clearAll } from "../utility/cache";

const useStore = () => {
  // const { store, setStore } = useContext(StoreContext);
  const { stores, setStores } = useContext(StoresContext);
  const { selectedStore, setSelectedStore } = useContext(SelectedStoreContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadStores = async () => {
    setLoading(true);
    const { error, stores } = await productAPIS.getStores();
    setError(error);
    setStores(stores);
    setLoading(false);
  };
  const loadStore = async () => {
    // setLoading(true);
    // const { error, store } = await productAPIS.getStore();
    // // setError(error);
    // // setStore(store);
    // setLoading(false);
  };
  const cacheSelectedStore = async (store) => {
    await store("selectedStore", store);
  };

  useEffect(() => {
    // loadStore();
    loadStores();
  }, []);

  return {
    error,
    loading,
    loadStore,
    // store,
    loadStores,
    stores,
    cacheSelectedStore,
    // getCcacheSelectedStore,
  };
};
export default useStore;
