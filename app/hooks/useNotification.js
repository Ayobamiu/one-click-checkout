import * as Notifications from "expo-notifications";
import expoPushTokenApi from "../api/expoPushTokens";
import appNavigation from "../navigation/rootNavigation";
import Constants from "expo-constants";
import { View, StyleSheet, Text, Button, Platform } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import OrderContext from "../contexts/order/context";

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync().catch((error) => {}))
      .data;
    await expoPushTokenApi.register(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
export async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

export const sendNotification = () => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Time's up!",
      body: "Change sides!",
    },
    trigger: {
      seconds: 2,
    },
  });
};
export default useNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const { orders, setOrders } = useContext(OrderContext);

  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        if (notification.request.content.data.type === "order") {
          const newOrder = notification.request.content.data.order;
          const indexExists = orders.findIndex((i) => i._id == newOrder._id);
          if (indexExists === -1) {
            //if not in orders
            setOrders([newOrder, ...orders]);
          }
        }
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        if (response.notification.request.content.data.type === "order") {
          const newOrder = response.notification.request.content.data.order;
          const indexExists = orders.findIndex((i) => i._id == newOrder._id);
          if (indexExists === -1) {
            //if not in orders
            setOrders([newOrder, ...orders]);
          }
          appNavigation.navigate("Order Details", newOrder);
        }
        // if (response.notification.request.content.data.type === "order") {
        //   appNavigation.navigate(
        //     "Order Details",
        //     response.notification.request.content.data.order
        //   );
        // }
        // appNavigation.navigate("Products");
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
};
