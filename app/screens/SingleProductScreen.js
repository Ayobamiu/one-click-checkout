import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  useWindowDimensions,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import PagerView from "react-native-pager-view";
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import showToast from "../config/showToast";
import copyToClipboard from "../config/copyToClipboard";
import onShare from "../config/onShare";
import shareImage from "../config/shareImage";
import productAPIS from "../api/products";
import ProductContext from "../contexts/product/context";
import UploadScreen from "../components/UploadScreen";
import AppModalFullPage from "../components/AppModalFullPage";
import AppButton from "../components/AppButton";

function SingleProductScreen(props) {
  const imageToSnap = useRef();
  const { products, setProducts } = useContext(ProductContext);
  // const [product, setProduct] = useState(props.route.params);
  // const product = props.route.params;
  const product = products.find((i) => i._id == props.route.params?._id);
  // useEffect(() => {
  //   if (product && !product.title) {
  //     console.log("product", product);
  //     setProduct(product);
  //   }
  // }, []);

  // const { height, width } = useWindowDimensions();
  const height = Dimensions.get("screen").height;

  const [errorLoadingProduct, setErrorLoadingProduct] = useState(true);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const onDelete = async (productId) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await productAPIS.deleteProduct(product._id, (progress) =>
      setProgress(progress)
    );
    setUploadVisible(false);
    if (result.error) {
      setUploadVisible(false);
      return showToast("Could not delete product");
    }
    const newList = products;

    if (result?.product?._id) {
      const productIndex = products.findIndex(
        (i) => i._id == result.product._id
      );
      newList.splice(productIndex, 1);
      setProducts([...newList]);
      props.navigation.goBack();
    }
  };
  const onPressDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this product?", [
      { text: "Yes", onPress: () => onDelete() },
      { text: "No" },
    ]);
  };

  if (!product) {
    return (
      <AppModalFullPage isVisble={errorLoadingProduct}>
        <View
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: 58,
          }}
        >
          <MaterialIcons
            name="error-outline"
            size={100}
            color={colors.danger}
          />
          <AppText
            size="medium"
            style={{
              textAlign: "center",
            }}
          >
            Problem loading Product.
          </AppText>
          <AppText
            style={{
              color: colors.light,
              textAlign: "center",
              paddingVertical: 16,
            }}
          >
            Kindly refresh page and try again. If problem persist, please reach
            out to us.
          </AppText>
          <AppButton
            title="Okay"
            fullWidth
            style={styles.bottom}
            onPress={() => {
              setErrorLoadingProduct(false);
              setTimeout(() => {
                props.navigation.goBack();
              }, 200);
            }}
            // disabled
          />
        </View>
      </AppModalFullPage>
    );
  }
  return (
    <Screen>
      <UploadScreen
        onDone={() => {
          setUploadVisible(false);
          props.navigation.goBack();
        }}
        progress={progress}
        visible={uploadVisible}
      />
      <ScrollView>
        <Pressable
          style={[styles.icon, { position: "absolute", top: 20, zIndex: 3 }]}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={30} color={colors.white} />
        </Pressable>
        <View style={[styles.floatAction, { top: height * 0.6 }]}>
          <Pressable
            style={[styles.icon]}
            onPress={() => {
              showToast("Link copied to Clipboard!");
              copyToClipboard(`https://www.monaly.co/product/${product?._id}`);
            }}
          >
            <Feather name="copy" size={30} color={colors.white} />
          </Pressable>

          <Pressable
            style={[styles.icon]}
            onPress={() => {
              onShare(
                `https://www.monaly.co/product/${product._id}`,
                `${product?.title}- ${product?.price}`,
                product.title
              );
            }}
          >
            <MaterialCommunityIcons
              name="share"
              size={30}
              color={colors.white}
            />
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
              props.navigation.navigate("Edit Product", product);
            }}
          >
            <Feather name="edit-2" size={35} color={colors.white} />
          </Pressable>
          <Pressable style={[styles.icon]} onPress={onPressDelete}>
            <MaterialCommunityIcons
              name="delete"
              size={35}
              color={colors.white}
            />
          </Pressable>
        </View>
        <PagerView
          style={[styles.viewPager, { height }]}
          initialPage={0}
          ref={imageToSnap}
        >
          {product.images &&
            product.images.map((image, index) => (
              <ImageBackground
                key={index}
                source={{ uri: image.image }}
                style={StyleSheet.absoluteFillObject}
                blurRadius={10}
              >
                <View style={[styles.cover]} />

                <Image
                  style={[styles.image, { height: height * 0.75 }]}
                  uri={image.image}
                  preview={{ uri: image.image }}
                  tint="light"
                />
                <AppText
                  size="header"
                  fontWeight="medium"
                  style={[styles.white, { margin: 10 }]}
                  numberOfLines={1}
                >
                  {product.title}
                </AppText>
                <AppText
                  size="large"
                  fontWeight="bold"
                  style={[styles.white, { marginHorizontal: 10 }, styles.bold]}
                  numberOfLines={1}
                >
                  &#8358;{product.price}
                </AppText>
              </ImageBackground>
            ))}
        </PagerView>

        <View style={styles.container}>
          <AppText size="medium" fontWeight="medium" style={[styles.mt16]}>
            {product.description}
          </AppText>

          {product.features && product.features.length > 0 && (
            <View>
              <AppText
                size="x-small"
                fontWeight="medium"
                style={[styles.mt16, styles.bold]}
                numberOfLines={1}
              >
                Key features
              </AppText>
              {product.features.map((item, index) => (
                <AppText
                  key={index}
                  size="x-small"
                  fontWeight="medium"
                  numberOfLines={1}
                >
                  &#8226; {item}
                </AppText>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  black: {
    color: colors.black,
  },
  bold: {
    fontWeight: "bold",
  },
  container: {
    padding: 16,
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
  floatAction: {
    position: "absolute",

    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: colors.opaqueBalck,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    backgroundColor: colors.grey,
  },
  medium: { color: colors.medium, textAlign: "justify" },
  mt16: {
    marginTop: 16,
  },
  viewPager: {
    backgroundColor: colors.grey,
  },
  white: {
    color: colors.white,
  },
});
export default SingleProductScreen;
