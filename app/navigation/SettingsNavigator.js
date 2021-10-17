import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../screens/Settings";
import MultiStepStoreForm from "../screens/MultiStepStoreForm";
import AddStoreScreen from "../screens/AddStoreScreen";
import StoreScreen from "../screens/StoreScreen";
import RightHeader from "../components/RightHeader";

const Stack = createNativeStackNavigator();

function SettingssNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName="Select Settings"
      // screenOptions={{ presentation: "modal" }}
    >
      <Stack.Screen
        name="Select Settings"
        component={Settings}
        // options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Add Store" component={MultiStepStoreForm} /> */}
      <Stack.Screen name="Edit Store" component={AddStoreScreen} />
      <Stack.Screen name="Store" component={StoreScreen} />
    </Stack.Navigator>
  );
}

export default SettingssNavigator;
