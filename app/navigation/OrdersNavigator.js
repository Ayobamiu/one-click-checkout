import React from "react";
import HomePageScreen from "../screens/HomePageScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BalanceScreen from "../screens/BalanceScreen";
import AddBankRecordScreen from "../screens/AddBankRecordScreen";
import OrdersListScreen from "../screens/OrdersListScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import WithdrawalScreen from "../screens/WithdrawalScreen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import ProfileScreen from "../screens/ProfileScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import StoreScreen from "../screens/StoreScreen";
import SingleProductScreen from "../screens/SingleProductScreen";
import MarketScreen from "../screens/MarketScreen";
import AddStoreScreen from "../screens/AddStoreScreen";
import AddProductScreen from "../screens/AddProductScreen";
import { View } from "react-native";
import RightHeader from "../components/RightHeader";
import MultiStepStoreForm from "../screens/MultiStepStoreForm";
import HelpScreen from "../screens/HelpScreen";
import TransactionsScreen from "../screens/TransactionsScreen";

const Stack = createNativeStackNavigator();

function OrdersNavigator(props) {
  return (
    <Stack.Navigator initialRouteName="Orders List">
      <Stack.Screen name="Order Details" component={OrderDetailsScreen} />
      <Stack.Screen name="Orders List" component={OrdersListScreen} />
    </Stack.Navigator>
  );
}

export default OrdersNavigator;
