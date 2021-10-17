import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { getCountries } from "../api/getAddress";

const useLocation = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
      } catch (error) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const countries = await getCountries();
      setCountries(countries);
    })();
  }, []);

  const getLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    return location;
  };

  return { getLocation, countries };
};
export default useLocation;
