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

const Stack = createNativeStackNavigator();

function MoneyNavigator(props) {
  return (
    <Stack.Navigator initialRouteName="Balance">
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
      <Stack.Screen name="Add Bank Record" component={AddBankRecordScreen} />

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
    </Stack.Navigator>
  );
}

export default MoneyNavigator;
