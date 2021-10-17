import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Pressable,
} from "react-native";
import useAuth from "../auth/useAuth";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ContentBlockSmall from "../components/ContentBlockSmall";
import SegmentedControl from "../components/SegmentedControl";
import colors from "../config/colors";
import { EvilIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import OrderItem from "../components/OrderItem";
import { Image } from "react-native-expo-image-cache";
import copyToClipboard from "../config/copyToClipboard";
import showToast from "../config/showToast";
import ListEmptyComponent from "../components/ListEmptyComponent";
import LottieView from "lottie-react-native";
import SectionHeader from "../components/SectionHeader";

function ProfileScreen(props) {
  const { user } = useAuth();

  const { products, orders } = props.route.params;

  const buttons = [{ name: "Products" }, { name: "Orders" }];
  const [showing, setShowing] = useState("Products");
  return (
    <View style={styles.container}>
      {!user.profilePhoto ? (
        <EvilIcons
          name="user"
          size={120}
          color={colors.gray3}
          style={{ alignSelf: "center" }}
        />
      ) : (
        <Image uri={user.profilePhoto} style={styles.imageContainer} />
      )}
      <View style={styles.whiteContainer}>
        <AppText
          fontWeight="bold"
          size="medium"
          style={[styles.black, styles.textCenter, styles.bold]}
        >
          {user.firstName} {user.lastName}
        </AppText>
        <Pressable
          style={{
            alignItems: "baseline",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={() => {
            copyToClipboard(`https://www.monaly.co/${user.userName}`);
            showToast("Link Copied");
          }}
        >
          <Ionicons name="ios-link" size={15} color={colors.link} />
          <AppText
            fontWeight="bold"
            size="x-small"
            style={[styles.link, styles.textCenter]}
          >
            {" "}
            monaly.co/{user.userName}
          </AppText>
        </Pressable>
        <AppText
          fontWeight="bold"
          size="x-small"
          style={[styles.black, styles.mv8, styles.textCenter]}
        >
          {user.bio}
        </AppText>

        <SegmentedControl
          data={buttons}
          onPress={(button) => setShowing(button.name)}
        />
        {showing === "Products" && (
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <ContentBlockSmall
                header={item.title}
                text={item.description}
                subHeader={item.price}
                thumbnailUri={
                  item.images && item.images[0] && item.images[0].image
                }
                imageUri={item.images && item.images[0] && item.images[0].image}
                onPress={() => {
                  props.navigation.navigate("Products", {
                    screen: "Product Details",
                    params: item,
                  });
                }}
              />
            )}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={() => (
              <SectionHeader
                buttonText="See all"
                headerText="Products"
                onPress={() => {
                  props.navigation.navigate("Products");
                }}
              />
            )}
            ListEmptyComponent={() => (
              <ListEmptyComponent
                text="No products in your catalogue yet. Add a product to get started"
                buttonText="Get started"
                onPress={() => {
                  props.navigation.navigate("Add Product Nav");
                }}
                visible={true}
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
        )}
        {showing === "Orders" && (
          <FlatList
            data={orders}
            renderItem={({ item }) => (
              <OrderItem
                // key={index}
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
            keyExtractor={(item) => item._id}
            ListHeaderComponent={() => (
              <SectionHeader
                buttonText="See all"
                headerText="Orders"
                onPress={() => {
                  props.navigation.navigate("Orders List", orders);
                }}
              />
            )}
            ListEmptyComponent={() => (
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
            )}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  black: {
    color: colors.black,
  },
  link: {
    color: colors.link,
  },
  bold: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  contentBlock: { marginVertical: 8 },
  primaryContainer: {
    width: "100%",
    height: 230,
    backgroundColor: colors.primary,
    position: "relative",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 79,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    overflow: "hidden",
    marginVertical: 16,
  },
  logoutButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  mv8: {
    marginVertical: 8,
  },
  textCenter: { textAlign: "center" },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  separator: {
    marginVertical: 4,
  },
  whiteContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
export default ProfileScreen;
