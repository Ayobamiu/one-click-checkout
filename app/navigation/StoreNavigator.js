import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../screens/Settings";
import SelectStoreScreen from "../screens/SelectStoreScreen";
import AddStoreScreen from "../screens/AddStoreScreen";
import MultiStepStoreForm from "../screens/MultiStepStoreForm";

const Stack = createNativeStackNavigator();

function StoreNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName="Select Store"
      screenOptions={{ presentation: "modal" }}
    >
      <Stack.Screen
        name="Select Store"
        component={SelectStoreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Add Store" component={MultiStepStoreForm} />
    </Stack.Navigator>
  );
}

export default StoreNavigator;
