import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";
import colors from "../config/colors";
import HomeNavigator from "./HomeNavigator";
import ProductsNavigator from "./ProductsNavigator";
import useNotification from "../hooks/useNotification";
import MultiStepForm from "../components/MultiStepForm";
import MoneyNavigator from "./MoneyNavigator";
import SettingssNavigator from "./SettingsNavigator";
import Screen from "../components/Screen";
import {
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import AppText from "../components/AppText";
import OrdersNavigator from "./OrdersNavigator";

const Tab = createBottomTabNavigator();

function TabNavigator(props) {
  // const [selectedStore, setSelectedStore] = useState(null);
  // const { width, height } = useWindowDimensions();
  // const bigCardHeight = height * 0.7;
  // const smallCardHeight = height * 0.2;
  const stores = [
    { _id: "17251", name: "Store No. 1" },
    { _id: "17252", name: "Store No. 2" },
    { _id: "17253", name: "Store No. 3" },
  ];
  useNotification();
  // if (!selectedStore)
  //   return (
  //     <Screen style={{ padding: 30, paddingVertical: 50 }}>
  //       <View>
  //         <FlatList
  //           data={stores}
  //           keyExtractor={(item) => item._id}
  //           renderItem={({ item }) => (
  //             <Pressable
  //               style={{
  //                 height: smallCardHeight,
  //                 width: "100%",
  //                 borderRadius: 32,
  //                 backgroundColor: colors.cavendish,
  //                 justifyContent: "flex-end",
  //                 padding: 30,
  //                 marginVertical: 10,
  //                 position: "relative",
  //               }}
  //             >
  //               <Ionicons
  //                 name="ios-open-outline"
  //                 size={smallCardHeight / 5}
  //                 color={colors.peppercorn}
  //                 style={{ position: "absolute", top: 20, right: 20 }}
  //               />

  //               <AppText
  //                 size="header"
  //                 style={{
  //                   color: colors.peppercorn,
  //                   fontSize: smallCardHeight / 5,
  //                 }}
  //               >
  //                 {item.name}
  //               </AppText>
  //             </Pressable>
  //           )}
  //           ListHeaderComponent={
  //             <AppText size="large" style={{ fontWeight: "bold" }}>
  //               Select a Store
  //             </AppText>
  //           }
  //           ListEmptyComponent={
  //             <Pressable
  //               style={{
  //                 height: height * 0.7,
  //                 width: "100%",
  //                 borderRadius: 32,
  //                 backgroundColor: colors.peppercorn,
  //                 justifyContent: "flex-end",
  //                 padding: 30,
  //                 marginVertical: 10,
  //                 position: "relative",
  //               }}
  //               onPress={() => console.log("Pressed")}
  //             >
  //               <Feather
  //                 name="plus-circle"
  //                 size={bigCardHeight / 10}
  //                 color={colors.white}
  //                 style={{ position: "absolute", top: 20, right: 20 }}
  //               />
  //               <AppText
  //                 // size="large"
  //                 style={{
  //                   color: colors.white,
  //                   fontWeight: "600",
  //                   fontSize: bigCardHeight / 10,
  //                   // lineHeight: 40,
  //                 }}
  //               >
  //                 Add up an Ecommerce store to get started
  //               </AppText>
  //             </Pressable>
  //           }
  //         />
  //       </View>
  //     </Screen>
  //   );
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Activity"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="activity" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Money"
        component={MoneyNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-swap-horizontal" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Add Product"
        component={MultiStepForm}
        options={({ navigation }) => ({
          tabBarIcon: ({ size, color }) => (
            <Feather name="plus-square" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-list-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="download-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
