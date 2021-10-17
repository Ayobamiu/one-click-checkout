import { useContext, useEffect, useState } from "react";
import productAPIS from "../api/products";
import OrderContext from "../contexts/order/context";

const useOrder = () => {
  const { orders, setOrders } = useContext(OrderContext);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    const { error, orders } = await productAPIS.getOrders();
    setError(error);
    setOrders(orders);
    setLoading(false);
  };
  useEffect(() => {
    // if (orders.length === 0) {
    loadOrders();
    // }
  }, []);
  useEffect(() => {
    setOrders(data);
  }, [data]);

  return {
    orders,
    setOrders,
    orderError: error,
    orderLoading: loading,
    loadOrders,
  };
};
export default useOrder;
