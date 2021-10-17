import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import DataItem from "../components/DataItem";
import Screen from "../components/Screen";
import colors from "../config/colors";
import productAPIS from "../api/products";
import timeSince from "../utility/timeSince";
import ErrorComponent from "../components/ErrorComponent";
import { Ionicons } from "@expo/vector-icons";
import ListEmptyComponent from "../components/ListEmptyComponent";
import LottieView from "lottie-react-native";

function TransactionsScreen(props) {
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    (async () => {
      await loadTransactions();
    })();
  }, []);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadTransactions = async () => {
    setLoading(true);
    const result = await productAPIS.getTransactions();
    setLoading(false);
    setTransactions(result);
  };
  useEffect(() => {
    loadTransactions();
  }, []);
  return (
    <Screen style={styles.container} loading={loading}>
      {loading && (
        <ActivityIndicator
          color={colors.primary}
          animating={loading}
          hidesWhenStopped
        />
      )}
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <DataItem
            subtext={`${item.currency} ${item.amount}`}
            time={`${timeSince(new Date(item.createdAt))} ago`}
            type={item.type}
            text={item.description}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View>
            <ListEmptyComponent
              text="No transactions recorded. List of all your transactions will show here"
              visible={!loading}
              iconComponent={
                <View style={{ height: 100, width: "100%" }}>
                  <LottieView
                    source={require("../assets/animations/credit-cards.json")}
                    autoPlay
                    loop
                  />
                </View>
              }
            />
            <ListEmptyComponent
              text="loading transactions.."
              visible={loading}
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
        }
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  circle: {
    width: 196,
    height: 196,
    borderRadius: 98,
    borderColor: colors.primary,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    alignSelf: "center",
  },
  container: { padding: 16 },

  primary: {
    color: colors.primary,
  },
  separator: {
    marginVertical: 4,
  },
});
export default TransactionsScreen;
