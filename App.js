import React, { useEffect, useRef, useState } from "react";
import "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import TabNavigator from "./app/navigation/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./app/navigation/navigationTheme";
import { useNetInfo } from "@react-native-community/netinfo";
import showToast from "./app/config/showToast";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import AppLoading from "expo-app-loading";
import { navigationRef } from "./app/navigation/rootNavigation";
import { Text, View } from "react-native";
import FullPageProduct from "./app/components/FullPageProduct";
import FullPageProducts from "./app/screens/FullPageProducts";
import OrderItem from "./app/components/OrderItem";
import ContentBlockSmall from "./app/components/ContentBlockSmall";
import MultiStepForm from "./app/components/MultiStepForm";
import MultiStepStoreForm from "./app/screens/MultiStepStoreForm";
import StoreContext from "./app/contexts/eStore/context";
import OrderContext from "./app/contexts/order/context";
import StoreNavigator from "./app/navigation/StoreNavigator";
import SelectedStoreContext from "./app/contexts/selectedStore/context";
import ProductContext from "./app/contexts/product/context";
import StoresContext from "./app/contexts/stores/context";
import useStore from "./app/hooks/useEStore";
import { get } from "./app/utility/cache";

// import {
//   useFonts,
//   Inter_600SemiBold,
//   Inter_500Medium,
//   Inter_400Regular,
// } from "@expo-google-fonts/inter";

export default function App() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState({});
  const [selectedStore, setSelectedStore] = useState(null);
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const netInfo = useNetInfo();

  useEffect(() => {
    if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false) {
      showToast("No Internet Connection");
    }
  }, [netInfo.isInternetReachable]);

  const restoreUser = async () => {
    const user = await authStorage.getUser().catch((error) => {});
    const selectedStore = await get("selectedStore");
    if (selectedStore) setSelectedStore(selectedStore);
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn("Error Authenticating")}
      />
    );
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <StoresContext.Provider value={{ stores, setStores }}>
        <SelectedStoreContext.Provider
          value={{ selectedStore, setSelectedStore }}
        >
          <StoreContext.Provider value={{ store, setStore }}>
            <ProductContext.Provider value={{ products, setProducts }}>
              <OrderContext.Provider value={{ orders, setOrders }}>
                <RootSiblingParent>
                  <NavigationContainer
                    ref={navigationRef}
                    theme={navigationTheme}
                  >
                    {user && selectedStore ? (
                      <TabNavigator /> //User is logged in and yet to select a store
                    ) : user ? (
                      <StoreNavigator /> //User is logged in and have selected a store
                    ) : (
                      <AuthNavigator /> //User is not logged in and yet to select a store
                    )}
                  </NavigationContainer>
                </RootSiblingParent>
              </OrderContext.Provider>
            </ProductContext.Provider>
          </StoreContext.Provider>
        </SelectedStoreContext.Provider>
      </StoresContext.Provider>
    </AuthContext.Provider>
  );
  // return (
  //   <View>
  //     {/* <Text>Hi</Text> */}
  //     <MultiStepStoreForm />
  //   </View>
  // );
}
