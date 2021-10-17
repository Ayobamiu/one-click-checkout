import React, { useCallback, useState } from "react";
import { StyleSheet, FlatList, RefreshControl, View } from "react-native";
import AppPicker from "../components/AppPicker";
import colors from "../config/colors";
import OrderItem from "../components/OrderItem";
import ListEmptyComponent from "../components/ListEmptyComponent";
import useOrder from "../hooks/useOrders";
import LottieView from "lottie-react-native";
const items = [
  { name: "Electronics", id: "1" },
  { name: "Wears", id: "2" },
  { name: "Furniture", id: "3" },
];
function OrdersListScreen(props) {
  const { orders, loadOrders, orderLoading } = useOrder();

  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    (async () => {
      await loadOrders();
    })();
  }, []);
  return (
    <FlatList
      data={orders}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <OrderItem
          header={`${item.products && item.products.length} Item${
            item.products && item.products.length > 1 ? "s" : ""
          }`}
          subHeader={new Date(item.createdAt).toLocaleDateString()}
          text={item.deliveryMerchant}
          price={item.amount}
          onPress={() => {
            props.navigation.navigate("Order Details", item);
          }}
        />
      )}
      ListEmptyComponent={() => (
        <View>
          <ListEmptyComponent
            text="No order from your store yet. Share product links with customers to get started"
            visible={orders.length === 0 && !orderLoading}
            iconComponent={
              <View style={{ height: 100, width: "100%" }}>
                <LottieView
                  source={require("../assets/animations/empty_order2.json")}
                  autoPlay
                  loop
                />
              </View>
            }
          />
          <ListEmptyComponent
            text="loading orders.."
            visible={orderLoading}
            iconComponent={
              <View style={{ width: "100%", height: 100 }}>
                <LottieView
                  source={require("../assets/animations/loading_dots.json")}
                  autoPlay
                  loop
                />
              </View>
            }
          />
        </View>
      )}
      keyExtractor={(item) => item._id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      // ListHeaderComponent={() => (
      //   <AppPicker
      //     items={items}
      //     placeholder="Filter"
      //     displayProperty="name"
      //     selectedItem={selectedFilter}
      //     onSelectItem={setSelectedFilter}
      //     justText={true}
      //     justTextStyle={styles.filterText}
      //     id="id"
      //   />
      // )}
    />
  );
}
const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  filterText: {
    color: colors.primary,
    alignSelf: "flex-end",
  },
  icon: { marginHorizontal: 10 },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mv15: {
    marginVertical: 15,
  },
  separator: {
    marginVertical: 4,
  },
});
export default OrdersListScreen;
