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
import Settings from "../screens/Settings";

const Stack = createNativeStackNavigator();

function HomeNavigator(props) {
  return (
    <Stack.Navigator initialRouteName="Homepage">
      <Stack.Screen
        name="Homepage"
        component={HomePageScreen}
        // options={{ title: "" }}
      />
      <Stack.Screen name="Order Details" component={OrderDetailsScreen} />
      <Stack.Screen name="Orders List" component={OrdersListScreen} />
      <Stack.Screen
        name="Withdraw"
        component={WithdrawalScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <RightHeader
              onPress={() => {
                navigation.navigate("Add Bank Record");
              }}
              text="Add new Bank"
            />
          ),
        })}
      />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Add Store" component={MultiStepStoreForm} />
      <Stack.Screen name="Edit Store" component={AddStoreScreen} />
      <Stack.Screen name="Add Product" component={AddProductScreen} />
      <Stack.Screen name="Add Bank Record" component={AddBankRecordScreen} />
      <Stack.Screen
        name="Store"
        component={StoreScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <RightHeader
              onPress={() => {
                navigation.navigate("Edit Store");
              }}
              text="Edit Details"
            />
          ),
        })}
      />
      <Stack.Screen name="Update Profile" component={UpdateProfileScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Balance"
        component={BalanceScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <RightHeader
              onPress={() => {
                navigation.navigate("Withdraw");
              }}
              text="Withdraw"
            />
          ),
        })}
      />
      <Stack.Screen
        name="Select Settings"
        component={Settings}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
