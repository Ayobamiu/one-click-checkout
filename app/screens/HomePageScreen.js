import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  RefreshControl,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import MarketBlock from "../components/MarketBlock";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

import Constant from "expo-constants";
import SectionHeader from "../components/SectionHeader";

import ListEmptyComponent from "../components/ListEmptyComponent";
import useAuth from "../auth/useAuth";
import useProduct from "../hooks/useProduct";
import useOrder from "../hooks/useOrders";
import OrderItem from "../components/OrderItem";
import useStore from "../hooks/useEStore";
import ProductContext from "../contexts/product/context";
import SideMenu from "../components/SideMenu";
import Screen from "../components/Screen";
import SelectedStoreContext from "../contexts/selectedStore/context";
import useLocation from "../hooks/useLocation";
import { getAddressV2 } from "../api/getAddress";
import LottieView from "lottie-react-native";

function HomePageScreen(props) {
  Number.prototype.format = function (n, x) {
    var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
  };
  const { getLocation } = useLocation();

  const { user, logOut } = useAuth();
  const { error, loading, loadProducts } = useProduct();
  const { products } = useContext(ProductContext);
  const { selectedStore } = useContext(SelectedStoreContext);
  const height = Dimensions.get("screen").height;

  const { orders, loadOrders } = useOrder();
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [location, setLocation] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    (async () => {
      await loadProducts();
      await loadOrders();
    })();
  }, []);
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: selectedStore.name,
      headerRight: () => (
        <Ionicons
          name="ios-settings-outline"
          size={24}
          color="black"
          onPress={() => {
            props.navigation.navigate("Select Settings");
          }}
        />
      ),
    });
  }, [props.navigation]);
  useEffect(() => {
    (async () => {
      const pp = await getLocation();
      await getAddressV2(
        "3b4c10a64fff96eaf6167a0c4c3926d5",
        pp.coords.latitude,
        pp.coords.longitude
      )
        .catch((error) => {
          // showToast("Could not get your loaction. Try again!");
        })
        .then((response) => {
          if (response) {
            setLocation(response);
          } else {
            // showToast("Could not get your loaction. Try again!");
          }
        });
    })();
  }, []);

  return (
    <Screen loading={loading}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SideMenu
          user={user}
          logOut={logOut}
          store={selectedStore}
          products={products}
          orders={orders}
          showSideMenu={showSideMenu}
          setShowSideMenu={setShowSideMenu}
          navigation={props.navigation}
        />

        <Pressable
          onPress={() => {
            props.navigation.navigate("Money");
          }}
          style={[styles.mainBox, { height: height * 0.5 }]}
          blurRadius={50}
        >
          <AppText
            size="large"
            fontWeight="bold"
            style={[styles.white, styles.mainText, { fontSize: height * 0.08 }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            &#8358;{selectedStore?.availableBalance?.format(2)}
            {/* {formatter.format(selectedStore?.availableBalance)} */}
          </AppText>
          <AppText
            size="x-small"
            style={[styles.white, { fontSize: (height * 0.08) / 5 }]}
          >
            Available Balance
          </AppText>
          {location && (
            <AppText
              size="x-small"
              style={[
                styles.white,
                { fontSize: (height * 0.08) / 5, marginTop: "auto" },
              ]}
            >
              <EvilIcons name="location" color={colors.white} />{" "}
              {location?.label}
            </AppText>
          )}
        </Pressable>

        <SectionHeader
          headerText="Recent Products"
          buttonText="See all"
          onPress={() => {
            props.navigation.navigate("Products", {
              screen: "Market",
            });
          }}
        />

        <ListEmptyComponent
          text="Couldn't load products.."
          buttonText="Retry"
          onPress={() => {
            (async () => {
              await loadProducts();
            })();
          }}
          visible={error}
        />
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <MarketBlock
              header={`${item.price}`}
              item={item}
              text={item.title}
              thumbnailUri={
                item.images && item.images[0] && item.images[0].image
              }
              imageUri={item.images && item.images[0] && item.images[0].image}
              onPress={() => {
                props.navigation.navigate("Products", {
                  screen: "Product Details",
                  initial: false,
                  params: item,
                });
              }}
              navigation={props.navigation}
            />
          )}
          keyExtractor={(item) => item._id}
          horizontal={true}
          ItemSeparatorComponent={() => <View style={styles.marketBlock} />}
          ListEmptyComponent={() => (
            <ListEmptyComponent
              text="No products in your catalogue yet. Add a product to get started"
              buttonText="Get started"
              onPress={() => {
                props.navigation.navigate("Add Product Nav");
              }}
              visible={!error}
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
          )}
        />

        <SectionHeader
          headerText="Recent Orders"
          buttonText="See all"
          onPress={() => {
            props.navigation.navigate("Orders List", orders);
          }}
        />
        <ListEmptyComponent
          text="No order from your store yet. Share product links with customers to get started"
          visible={orders.length === 0}
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
        <ScrollView style={styles.h300}>
          {orders?.map((item, index) => (
            <OrderItem
              key={index}
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
          ))}
        </ScrollView>
        <View style={{ height: 200 }} />
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  addNewButton: {
    height: 70,
    borderRadius: 35,
    width: 70,
    position: "absolute",
    bottom: 30,
    right: 0,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  boxWithShadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  bold: { fontWeight: "bold" },
  bgWhite: { backgroundColor: colors.white },
  between: { justifyContent: "space-between" },
  black: { color: colors.black },
  closeIcon: { margin: 16 },
  container: {
    paddingHorizontal: 16,
    position: "relative",
    paddingTop: Constant.statusBarHeight,
    paddingBottom: 100,
  },
  faintColor: { color: colors.medium },
  float: { position: "absolute", top: 0, right: "50%" },
  graph: {
    height: 234,
    width: "100%",
    borderRadius: 24,
    backgroundColor: "#AF52DE",
  },
  h300: {
    overflow: "scroll",
    flex: 1,
  },
  mainBox: {
    // height: 300,
    width: "100%",
    backgroundColor: colors.peppercorn,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 16,
  },
  marketBlock: {
    margin: 8,
  },
  modal: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  modalRight: {
    backgroundColor: colors.white,
    flex: 0.6,
    height: "100%",
    paddingHorizontal: 20,
  },
  mb40: { marginBottom: 40 },
  modalLeft: {
    backgroundColor: colors.opaqueBalck,
    flex: 0.4,
    height: "100%",
    alignItems: "flex-end",
  },
  mtAuto: { marginTop: "auto" },
  mlAuto: { marginLeft: "auto" },
  mh16: { marginHorizontal: 16 },
  mv8: { marginVertical: 8 },
  mv16: { marginVertical: 16 },
  primary: { color: colors.primary },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  separatorWithBorderBottom: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  separator: {
    marginVertical: 4,
  },
  swipeLeft: {
    width: 200,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  white: { color: colors.white },
  mlauto: { marginLeft: "auto", marginRight: 10 },
  mainText: {
    // fontSize: 50,
    fontWeight: "700",
    letterSpacing: 4,
  },
  subMainText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  topNav: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    paddingVertical: 3,
  },
});
export default HomePageScreen;
