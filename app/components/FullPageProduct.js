import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  ImageBackground,
} from "react-native";
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";
import onShare from "../config/onShare";
import copyToClipboard from "../config/copyToClipboard";
import showToast from "../config/showToast";
import shareImage from "../config/shareImage";
import { Image } from "react-native-expo-image-cache";

function FullPageProduct({ product, navigation }) {
  const imageToSnap = useRef();
  const { height, width } = useWindowDimensions();
  const productImage =
    product.images && product.images[0] && product.images[0].image;
  return (
    <View style={[styles.container, { height, width }]}>
      <ImageBackground
        ref={imageToSnap}
        source={{
          uri: productImage,
        }}
        resizeMode="cover"
        style={[StyleSheet.absoluteFillObject]}
        onPress={() => {
          navigation.navigate("Product Details", product);
        }}
        blurRadius={1}
      >
        <View style={[styles.cover]} />
        <Image
          uri={productImage}
          style={{
            height: height * 0.75,
            // margin: width * 0.05,
            // marginVertical: width * 0.1,
            width: width,
            // borderRadius: 16,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.5,
            shadowRadius: 20,
            elevation: 10,
          }}
        />
        {!productImage && (
          <MaterialCommunityIcons
            name="image-off"
            size={100}
            color={colors.gray}
          />
        )}
        <View style={[styles.title]}>
          <AppText size="header" style={[styles.titleText]} numberOfLines={2}>
            {product.title}
          </AppText>
          <AppText
            size="large"
            style={[styles.titleText, styles.bold]}
            numberOfLines={2}
          >
            &#8358;{product.price}
          </AppText>
        </View>
      </ImageBackground>
      <View style={[styles.float, { top: height * 0.6 }]}>
        <Pressable
          style={[styles.icon]}
          onPress={() => {
            navigation.navigate("Edit Product", product);
          }}
        >
          <Feather name="edit-2" size={30} color={colors.white} />
        </Pressable>

        <Pressable
          style={[styles.icon]}
          onPress={() => {
            showToast("Link copied to Clipboard!");
            copyToClipboard(
              `${product.title} \n ${product.price} \n ${product.link}`
            );
          }}
        >
          <Feather name="copy" size={30} color={colors.white} />
        </Pressable>
        <Pressable
          style={[styles.icon]}
          onPress={() => {
            shareImage(imageToSnap.current);
          }}
        >
          <MaterialIcons
            name="mobile-screen-share"
            size={30}
            color={colors.white}
          />
        </Pressable>
        <Pressable
          style={[styles.icon]}
          onPress={() => {
            onShare(
              `${product.title}- ${product.price}`,
              product.link,
              product.title
            );
          }}
        >
          <MaterialCommunityIcons name="share" size={30} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bold: { fontWeight: "bold" },
  container: {
    backgroundColor: colors.opaqueBalck2,
    alignSelf: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
    // height: "100%",
    // width: "100%",
  },
  float: {
    position: "absolute",

    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    flexDirection: "row",
  },
  fullImage: {
    width: "90%",
    height: "70%",
    position: "absolute",
    borderRadius: 32,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    margin: "5%",
  },
  header: {
    position: "absolute",
    left: 20,
    bottom: "30%",
    maxWidth: "70%",
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  icon: {
    margin: 10,
    backgroundColor: colors.opaqueBalck2,
    padding: 15,
    borderRadius: 100,
  },
  image: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "100%",
    justifyContent: "flex-start",
    height: "100%",
    backgroundColor: "#ffffff91",
  },

  title: {
    // position: "absolute",
    // top: "75%",
    padding: 16,
    borderRadius: 16,
    width: "100%",
    justifyContent: "center",
    // alignItems: "center",
  },
  titleText: {
    // textAlign: "center",
    color: colors.white,
  },
  text: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  cover: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: colors.opaqueBalck,
  },
});
export default FullPageProduct;
