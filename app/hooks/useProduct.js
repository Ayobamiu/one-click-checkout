import { useContext, useEffect, useState } from "react";
import productAPIS from "../api/products";
import AuthContext from "../auth/context";
import useApi from "../hooks/useApi";
import ProductContext from "../contexts/product/context";
import { get } from "../utility/cache";
import SelectedStoreContext from "../contexts/selectedStore/context";

const useProduct = () => {
  const { products, setProducts } = useContext(ProductContext);
  const { selectedStore, setSelectedStore } = useContext(SelectedStoreContext);

  const { data, error, loading, request: loadProducts } = useApi(
    productAPIS.getProducts
  );

  const loadCache = async () => {
    const productsInCache = await get(
      "/products/store/products/" + selectedStore?._id
    );
    if (productsInCache) {
      setProducts(productsInCache.products);
    }
  };
  useEffect(() => {
    // loadCache();
    loadProducts();
  }, []);
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const addProduct = (product) => {
    setProducts([product, ...products]);
  };

  return { products, setProducts, error, loading, loadProducts, addProduct };
};
export default useProduct;
