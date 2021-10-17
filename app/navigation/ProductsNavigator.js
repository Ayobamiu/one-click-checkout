import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SingleProductScreen from "../screens/SingleProductScreen";
import MarketScreen from "../screens/MarketScreen";
import FullPageProducts from "../screens/FullPageProducts";
import UpdateProductScreen from "../screens/UpdateProductScreen";

const Stack = createNativeStackNavigator();

function ProductsNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName="Market"
      // screenOptions={{ presentation: "modal" }}
    >
      <Stack.Screen
        name="Full Screen Products"
        component={FullPageProducts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Market"
        component={MarketScreen}
        options={{ title: "Products" }}
      />
      <Stack.Screen
        name="Product Details"
        component={SingleProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Product"
        component={UpdateProductScreen}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ProductsNavigator;
