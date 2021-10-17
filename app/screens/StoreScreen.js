import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ImageBackground,
  useWindowDimensions,
  Pressable,
} from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ContentBlockSmall from "../components/ContentBlockSmall";
import OrderItem from "../components/OrderItem";
import SegmentedControl from "../components/SegmentedControl";
import colors from "../config/colors";
import { Image } from "react-native-expo-image-cache";
import SectionHeader from "../components/SectionHeader";
import StoreContext from "../contexts/eStore/context";
import {
  MaterialCommunityIcons,
  EvilIcons,
  Feather,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import copyToClipboard from "../config/copyToClipboard";
import showToast from "../config/showToast";
import StoresContext from "../contexts/stores/context";
import RightHeader from "../components/RightHeader";

function StoreScreen(props) {
  const item = props.route.params;

  const { stores, setStores } = useContext(StoresContext);

  const targetStore = stores.find((i) => i._id == item._id);

  const { width, height } = useWindowDimensions();

  const bigCardHeight = height * 0.5;
  const smallCardHeight = height * 0.2;
  const bigCardText = bigCardHeight / 10;
  const smallCardText = smallCardHeight / 5;

  const buttons = [{ name: "Products" }, { name: "Orders" }];
  const [showing, setShowing] = useState("Products");

  React.useLayoutEffect(() => {
    props.navigation.setOptions(
      {
        title: targetStore.name,
        headerRight: () => (
          <RightHeader
            onPress={() => {
              props.navigation.navigate("Edit Store", item);
            }}
            text="Edit Store Details"
          />
        ),
      },
      [props.navigation]
    );
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.primaryContainer}
        source={{ uri: targetStore.banner }}
        resizeMode="cover"
      >
        <Image style={styles.imageContainer} uri={targetStore.logo} />
      </ImageBackground>
      <View style={styles.whiteContainer}>
        <AppText
          fontWeight="bold"
          size="medium"
          style={[styles.black, styles.textCenter, styles.bold]}
          numberOfLines={2}
        >
          {targetStore.name}
        </AppText>
        <Pressable
          style={{
            alignItems: "baseline",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={() => {
            copyToClipboard(`https://www.monaly.co/store/${targetStore.slug}`);
            showToast("Link Copied");
          }}
        >
          <Ionicons name="ios-link" size={15} color={colors.link} />
          <AppText
            fontWeight="bold"
            size="x-small"
            style={[{ color: colors.link }, styles.textCenter]}
          >
            {" "}
            monaly.co/store/{targetStore.slug}
          </AppText>
        </Pressable>
        <AppText
          fontWeight="bold"
          size="x-small"
          style={[styles.black, styles.mv8, styles.textCenter]}
          numberOfLines={2}
        >
          {targetStore.description}
        </AppText>
        <AppText
          size="medium"
          style={[styles.black, styles.mv8, styles.textCenter]}
        >
          <EvilIcons name="location" size={20} color="black" />{" "}
          {(targetStore.location && targetStore.location.label) ||
            "Unknown Location"}
        </AppText>
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            // height: bigCardHeight,
            width: "100%",
            borderRadius: 32,
            backgroundColor: colors.peppercorn,
            justifyContent: "flex-start",
            padding: smallCardText,
            marginVertical: 10,
            position: "relative",
            paddingVertical: bigCardText,
          }}
        >
          <View style={styles.detailsItem}>
            <EvilIcons
              name="location"
              color={colors.white}
              size={20}
              style={[styles.mr10]}
            />

            <View style={styles.textBox}>
              <AppText
                size="x-small"
                style={{
                  color: colors.white,
                }}
              >
                {targetStore?.location?.label}
              </AppText>
              <AppText size="x-small" style={{ color: colors.white }}>
                {targetStore?.location?.region} {targetStore?.location?.country}
              </AppText>
              <AppText size="x-small" style={{ color: colors.white }}>
                {targetStore?.location?.continent}
              </AppText>
            </View>
          </View>
          <View style={styles.detailsItem}>
            <Feather
              name="phone-call"
              color={colors.white}
              size={20}
              style={[styles.mr10]}
            />

            <View style={styles.textBox}>
              <AppText
                size="x-small"
                style={{
                  color: colors.white,
                }}
              >
                {targetStore?.phoneOne}
              </AppText>
            </View>
          </View>
          <View style={styles.detailsItem}>
            <FontAwesome
              name="sign-in"
              color={colors.white}
              size={20}
              style={[styles.mr10]}
            />

            <View style={styles.textBox}>
              <AppText
                size="x-small"
                style={{
                  color: colors.white,
                }}
              >
                {new Date(targetStore.createdAt).toDateString()}
              </AppText>
            </View>
          </View>
          <View style={styles.detailsItem}>
            <Feather
              name="link-2"
              size={20}
              color={colors.white}
              style={[styles.mr10]}
            />

            <View style={styles.textBox}>
              <AppText
                size="x-small"
                style={{
                  color: colors.link,
                }}
                onLongPress={() => {
                  copyToClipboard(
                    `https://www.monaly.co/store/${targetStore?.slug}`
                  );
                  showToast("Link Copied");
                }}
              >
                {`monaly.co/store/${targetStore?.slug}`}
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bold: { fontWeight: "bold" },
  black: { color: colors.black },
  container: {
    flex: 1,
  },
  contentBlock: { marginVertical: 8 },
  detailsItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
    // flex: 1,
    width: "100%",
  },
  primaryContainer: {
    width: "100%",
    height: 100,
    backgroundColor: colors.medium,
    position: "relative",
    // justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  imageContainer: {
    bottom: -30,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  mr10: { marginRight: 10 },
  mv8: {
    marginVertical: 8,
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  separator: {
    marginVertical: 4,
  },
  textBox: { flex: 1 },
  textCenter: { textAlign: "center" },
  whiteContainer: {
    flex: 1,
    padding: 16,
  },
});
export default StoreScreen;
