import  { useState } from "react";

export default useApi = (apiFunc) => {
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const request = async () => {
    setLoading(true);
    const { products: pp, error } = await apiFunc();
    setData(pp);
    setError(error);
    setLoading(false);
  };

  return { data, error, loading, request };
};
