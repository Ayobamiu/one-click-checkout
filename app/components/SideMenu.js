import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import Constant from "expo-constants";

function SideMenu({
  user,
  logOut,
  store,
  products,
  orders,
  showSideMenu,
  setShowSideMenu,
  navigation,
}) {
  return (
    <Modal
      visible={showSideMenu}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.modal}>
        <View style={styles.modalRight}>
          <View style={[styles.mv16, styles.mb40]}>
            <Pressable
              onPress={() => {
                navigation.navigate("Profile", {
                  user,
                  products,
                  orders,
                });
              }}
            >
              {!user.profilePhoto ? (
                <FontAwesome5
                  name="user-circle"
                  size={25}
                  color={colors.black}
                />
              ) : (
                <Image
                  style={styles.avatar}
                  source={{ uri: user.profilePhoto }}
                />
              )}
            </Pressable>

            <AppText
              size="medium"
              fontWeight="bold"
              style={[styles.black, styles.bold, styles.mv8]}
            >
              {user.firstName} {user.lastName}
            </AppText>
            <View style={styles.separatorWithBorderBottom} />
          </View>
          <AppText
            size="x-small"
            fontWeight="bold"
            style={[styles.black, styles.bold]}
          >
            Stores
          </AppText>

          <TouchableOpacity
            style={[styles.row, styles.mv8]}
            onPress={() => {
              //If not the current store, Change selected Store and load product for selected store
            }}
          >
            <AppText
              size="medium"
              fontWeight="medium"
              style={[styles.faintColor, styles.bold, styles.mv8]}
              onPress={() => {}}
            >
              {store.name}
            </AppText>
            <Ionicons
              name="ios-open-outline"
              size={20}
              color="black"
              style={[styles.faintColor, styles.mlAuto]}
            />
          </TouchableOpacity>
          <AppText
            size="medium"
            fontWeight="medium"
            style={[styles.bold, styles.mv8, styles.primary]}
            onPress={() => {
              navigation.navigate("Add Store");
            }}
          >
            Add new store
          </AppText>
          <View style={styles.separatorWithBorderBottom} />

          <TouchableOpacity
            style={[styles.row, styles.mv8]}
            onPress={() => {
              navigation.navigate("Help");
            }}
          >
            <AppText
              size="medium"
              fontWeight="medium"
              style={[styles.faintColor, styles.bold, styles.mv8]}
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
          <View style={styles.separatorWithBorderBottom} />
          <View style={[styles.mtAuto, styles.mv16]}>
            <View style={styles.separatorWithBorderBottom} />
            <AppText
              size="medium"
              fontWeight="medium"
              style={[styles.bold, styles.mv8, styles.primary]}
              onPress={() => {
                logOut();
              }}
            >
              Log Out
            </AppText>
          </View>
        </View>
        <Pressable
          style={styles.modalLeft}
          onPress={() => {
            setShowSideMenu(!showSideMenu);
          }}
        ></Pressable>
      </View>
    </Modal>
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
export default SideMenu;
