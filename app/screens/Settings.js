import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
import {
  MaterialCommunityIcons,
  Ionicons,
  EvilIcons,
} from "@expo/vector-icons";
import Constant from "expo-constants";
import useAuth from "../auth/useAuth";
import ProductContext from "../contexts/product/context";
import useOrder from "../hooks/useOrders";
import { Image } from "react-native-expo-image-cache";
import SelectedStoreContext from "../contexts/selectedStore/context";
import StoresContext from "../contexts/stores/context";
import { remove } from "../utility/cache";
import useStore from "../hooks/useEStore";

function Settings({ navigation }) {
  const { user, logOut } = useAuth();
  const { products } = useContext(ProductContext);
  const { selectedStore, setSelectedStore } = useContext(SelectedStoreContext);
  const { stores, setStores } = useContext(StoresContext);
  const { loadStores } = useStore();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    (async () => {
      setRefreshing(true);
      await loadStores();
      setRefreshing(false);
    })();
  }, []);

  const { orders } = useOrder();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Settings",
    });
  }, [navigation]);

  return (
    <View style={styles.modal}>
      <View style={styles.modalRight}>
        <View
          style={[
            styles.mv16,
            {
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: colors.grey,
              borderBottomWidth: 1,
              paddingBottom: 5,
            },
          ]}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("Profile", {
                user,
                products,
                orders,
              });
            }}
            style={{
              // backgroundColor: colors.gray,
              borderRadius: 20,
              marginRight: 10,
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!user.profilePhoto ? (
              <EvilIcons name="user" size={40} color="black" />
            ) : (
              <Image style={styles.avatar} uri={user.profilePhoto} />
            )}
          </Pressable>

          <View style={[styles.mv8]}>
            <AppText
              size="medium"
              fontWeight="bold"
              style={[styles.black, styles.bold]}
            >
              {user.firstName} {user.lastName}
            </AppText>
            <AppText size="x-small" style={[styles.black]}>
              {user.email}
            </AppText>
          </View>
          <View style={styles.separatorWithBorderBottom} />
        </View>

        <FlatList
          data={stores}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={
            <AppText
              size="header"
              fontWeight="bold"
              style={[styles.black, styles.bold]}
            >
              Stores
            </AppText>
          }
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.row, styles.mv8]}
              onPress={() => {
                navigation.navigate("Store", item);
                //If not the current store, Change selected Store and load product for selected store
              }}
            >
              <AppText
                size="medium"
                fontWeight="medium"
                style={[styles.faintColor, styles.mv8]}
                onPress={() => {}}
              >
                {item.name}{" "}
                <AppText style={{ color: colors.success }}>
                  {item._id == selectedStore._id && "Active"}
                </AppText>
              </AppText>
              <Ionicons
                name="ios-chevron-forward"
                size={20}
                color="black"
                style={[styles.faintColor, styles.mlAuto]}
              />
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <AppText
              size="medium"
              fontWeight="medium"
              style={[styles.mv8, styles.primary]}
              onPress={async () => {
                setSelectedStore(null);
                await remove("selectedStore");

                // setTimeout(() => {
                //   navigation.navigate("Settings", {
                //     screen: "Select Store",
                //   });
                // }, 200);
              }}
            >
              Switch Store
            </AppText>
          }
          ItemSeparatorComponent={() => (
            <View style={styles.separatorWithBorderBottom} />
          )}
        />

        {/* <View style={styles.separatorWithBorderBottom} /> */}

        <TouchableOpacity
          style={[styles.mtAuto, styles.row]}
          onPress={() => {
            navigation.navigate("Help");
          }}
        >
          <AppText
            size="medium"
            fontWeight="medium"
            style={[styles.faintColor]}
            onPress={() => {
              navigation.navigate("Help");
            }}
          >
            Help Center
          </AppText>
          <MaterialCommunityIcons
            name="help-circle-outline"
            size={24}
            color="black"
            style={[styles.faintColor, styles.mlAuto]}
          />
        </TouchableOpacity>

        <View style={[styles.mv16]}>
          <View style={styles.separatorWithBorderBottom} />
          <AppText
            size="medium"
            fontWeight="medium"
            style={[styles.mv8, styles.primary]}
            onPress={() => {
              logOut();
            }}
          >
            Log Out
          </AppText>
        </View>
      </View>
    </View>
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
    shadowColor: "#000",
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
    height: 110,
    width: "100%",
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    flex: 1,
    height: "100%",
    paddingHorizontal: 20,
  },
  mb30: { marginBottom: 30 },
  modalLeft: {
    backgroundColor: colors.opaqueBalck,
    flex: 0.4,
    height: "100%",
    alignItems: "flex-end",
  },
  mt10: { marginTop: 10 },
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
    fontSize: 40,
    fontWeight: "bold",
  },
  subMainText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: "#000",
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
export default Settings;
