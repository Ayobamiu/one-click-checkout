import React, { useContext, useState, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  View,
} from "react-native";
import Screen from "../components/Screen";
import ProductContext from "../contexts/product/context";
import ContentBlockSmall from "../components/ContentBlockSmall";
import useProduct from "../hooks/useProduct";
import ListEmptyComponent from "../components/ListEmptyComponent";
import colors from "../config/colors";
import LottieView from "lottie-react-native";

function MarketScreen(props) {
  const { products } = useContext(ProductContext);
  const { loadProducts, loading, error } = useProduct();
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <ActivityIndicator color={colors.primary} animating={loading} />
      ),
    });
  }, [props.navigation]);
  const [refreshing, setRefreshing] = useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    (async () => {
      setRefreshing(true);
      // wait(2000).then(() => setRefreshing(false));
      await loadProducts();
      setRefreshing(false);
    })();
  }, []);
  return (
    <Screen style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ContentBlockSmall
            item={item}
            header={item.title}
            navigation={props.navigation}
            text={item.description}
            subHeader={item.price}
            thumbnailUri={item.images && item.images[0] && item.images[0].image}
            imageUri={item.images && item.images[0] && item.images[0].image}
            onPress={() => {
              props.navigation.navigate("Products", {
                screen: "Product Details",
                params: item,
              });
            }}
          />
        )}
        ListEmptyComponent={() => (
          <View>
            <ListEmptyComponent
              text="No products in your catalogue yet. Add a product to get started"
              buttonText="Get started"
              onPress={() => {
                props.navigation.navigate("Add Product Nav");
              }}
              visible={!error && !loading}
              iconComponent={
                <View style={{ height: 100, width: "100%" }}>
                  <LottieView
                    source={require("../assets/animations/629-empty-box.json")}
                    autoPlay
                    loop
                  />
                </View>
              }
            />
            <ListEmptyComponent
              text="Couldn't load products.."
              buttonText="Retry"
              onPress={() => {
                (async () => {
                  await loadProducts();
                })();
              }}
              visible={error && !loading}
            />
            <ListEmptyComponent
              text="loading products.."
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
        )}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  headerText: {
    marginVertical: 8,
  },
  marketBlock: {
    margin: 8,
  },
  searchBox: {
    marginVertical: 16,
  },
});
export default MarketScreen;
