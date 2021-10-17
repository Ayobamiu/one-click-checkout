import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import * as ImagePicker from "expo-image-picker";
import VideoInput from "../components/VideoInput";
import productAPIS from "../api/products";
import ProductContext from "../contexts/product/context";
import UploadScreen from "../components/UploadScreen";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";

function UpdateProductScreen(props) {
  const { products, setProducts } = useContext(ProductContext);
  // const product = props.route.params;
  const product = props.route.params;
  // const product = products.find((i) => i._id == props.route.params._id);
  const [images, setImages] = useState([...product?.images]);
  const [feature, setFeature] = useState("");
  const [features, setFeatures] = useState([...product?.features]);

  const [video, setVideo] = useState(product?.video);
  const [description, setDescription] = useState(product?.description);
  const [returnable, setReturnable] = useState(product?.returnable);
  const [isAssured, setIsAssured] = useState(product?.isAssured);
  const [numberInStock, setNumberInStock] = useState(product?.numberInStock);
  const [shippingFee, setShippingFee] = useState(product?.shippingFee);
  const [title, setTitle] = useState(product?.title);
  const [price, setPrice] = useState(product?.price);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);

  const saveUpdate = async (productId) => {
    setProgress(0);
    setUploadVisible(true);

    const result = await productAPIS.updateProduct(
      {
        features: [...features],
        description,
        returnable,
        isAssured,
        numberInStock,
        shippingFee,
        title,
        price,
      },
      product?._id,
      (progress) => setProgress(progress)
    );
    setUploadVisible(false);
    if (result.error) {
      setUploadVisible(false);
      return alert("Could not update product");
    }

    if (result.product && result.product?._id) {
      const newProducts = products;

      const productIndex = products.findIndex((i) => i?._id == product?._id);

      if (productIndex !== -1) {
        newProducts.splice(productIndex, 1, result.product);

        setProducts([...newProducts]);
      }
    }
    props.navigation.navigate("Market");
  };
  const handleAddVideo = async (video, productId) => {
    setLoadingVideo(true);
    const result = await productAPIS.addProductImage(
      "video",
      { ...video, name: `video${Math.random() * 10000}.mp4` },
      product?._id
    );
    if (result.error) {
      setVideo(null);
      setLoadingVideo(false);
      return alert("Could not add video");
    }
    if (result.product && result.product?._id) {
      const newProducts = products;
      const productIndex = products.findIndex(
        (product) => product?._id == productId
      );
      if (productIndex !== -1) {
        newProducts.splice(productIndex, 1, result.product);
        setProducts([...newProducts]);
      }
    }
    setLoadingVideo(false);
  };
  const handleAddImage = async (image, productId) => {
    setLoadingImage(true);
    const result = await productAPIS.addProductImage(
      "image",
      { ...image, name: `image${product?.images.length + 1}.jpg` },
      productId
    );
    if (result.error) {
      setImages([...images.splice(images.length - 1, 1)]);
      setLoadingImage(false);
      return alert("Could not add image");
    }
    if (result.product && result.product?._id) {
      const newProducts = products;
      const productIndex = products.findIndex(
        (product) => product?._id == productId
      );
      if (productIndex !== -1) {
        newProducts.splice(productIndex, 1, result.product);
        setProducts([...newProducts]);
      }
    }
    setLoadingImage(false);
  };
  const handleDeleteImage = async (imageId, productId) => {
    const result = await productAPIS.deleteProductImage(imageId, productId);
    if (result.error) {
      return alert("Could not delete image");
    }
    if (result.product && result.product?._id) {
      const newProducts = products;
      const productIndex = products.findIndex(
        (product) => product?._id == productId
      );
      if (productIndex !== -1) {
        newProducts.splice(productIndex, 1, result.product);
        setProducts([...newProducts]);
      }
    }
  };
  useEffect(() => {
    requestPermission();
  }, []);
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the Library");
  };
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        setImages([...images, result.uri]);
        handleAddImage(result, product?._id);
      }
    } catch (error) {}
  };

  const [progress, setProgress] = useState(0);
  const [uploadVisible, setUploadVisible] = useState(false);

  const onDeleteFeature = (index) => {
    const newList = features;
    newList.splice(index, 1);
    setFeatures([...newList]);
  };
  const onDelete = (index, _id) => {
    const newList = images;
    newList.splice(index, 1);
    setImages([...newList]);
    //delete image in the backend
    handleDeleteImage(_id, product?._id);
  };

  const onPressDeleteFeature = (index) => {
    Alert.alert("Delete", "Are you sure you want to delete this feature?", [
      { text: "Yes", onPress: () => onDeleteFeature(index) },
      { text: "No" },
    ]);
  };
  const onPressDelete = (index, _id) => {
    Alert.alert("Delete", "Are you sure you want to delete this image?", [
      { text: "Yes", onPress: () => onDelete(index, _id) },
      { text: "No" },
    ]);
  };
  // React.useLayoutEffect(() => {
  // props.navigation.setOptions({
  //   headerRight: () => (
  //     <AppText
  //       size="medium"
  //       style={[styles.primary, styles.bold]}
  //       onPress={saveUpdate}
  //     >
  //       Save Update
  //     </AppText>
  //   ),
  // });
  // }, [props.navigation]);
  return (
    <Screen loading={loadingImage}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView style={styles.container}>
          <UploadScreen
            onDone={() => {
              setUploadVisible(false);
              // props.navigation.goBack();
            }}
            progress={progress}
            visible={uploadVisible}
          />
          <View style={styles.textContainer}>
            <View style={[styles.row, styles.mv10]}>
              <AppText size="x-small" style={[styles.bold]}>
                Product Media{" "}
                <ActivityIndicator
                  animating={loadingImage}
                  color={colors.primary}
                />
              </AppText>
            </View>
          </View>
          <View style={styles.imageContainer}>
            {images.map((item, index) => (
              <ImageBackground
                key={index}
                source={{ uri: item.image }}
                resizeMode="cover"
                style={[styles.image]}
              >
                <Pressable
                  style={[styles.icon]}
                  onPress={() => {
                    onPressDelete(index, item._id);
                  }}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={15}
                    color={colors.white}
                  />
                </Pressable>
              </ImageBackground>
            ))}
            <Pressable style={[styles.image]} onPress={selectImage}>
              <MaterialCommunityIcons
                name="image-plus"
                size={25}
                color={colors.white}
              />
            </Pressable>
          </View>

          <ActivityIndicator animating={loadingVideo} color={colors.primary} />
          <VideoInput
            videoUri={video}
            onChangeVideo={(uri) => {
              setVideo(uri);
              handleAddVideo(uri, product?._id);
            }}
            style={styles.mv10}
          />

          <View style={styles.textContainer}>
            <View style={[styles.row, styles.mv10]}>
              <AppText size="x-small" style={[styles.bold]}>
                Product Details
              </AppText>
            </View>
            <AppText size="input">Title</AppText>
            <AppTextInput
              defaultValue={title}
              placeholder="Product title"
              onChangeText={(text) => setTitle(text)}
            />
            <AppText size="input">Description</AppText>
            <AppTextInput
              defaultValue={description}
              placeholder="Product description"
              onChangeText={(text) => setDescription(text)}
            />
            <AppText size="input">Price</AppText>
            <AppTextInput
              defaultValue={price?.toString()}
              placeholder="Price"
              onChangeText={(text) => setPrice(text)}
            />
            <AppText size="input">Quantity</AppText>
            <AppTextInput
              defaultValue={numberInStock?.toString()}
              placeholder="Quantity"
              onChangeText={(text) => setNumberInStock(text)}
            />
            <View style={[styles.row, styles.mv10]}>
              <AppText size="x-small" style={[styles.bold]}>
                Key Features
              </AppText>
            </View>
            {features.map((item, index) => (
              <View style={styles.row} key={index}>
                <View style={styles.flex9}>
                  <AppTextInput
                    defaultValue={item}
                    placeholder="Product description"
                    onChangeText={(text) => {
                      const newList = features;
                      newList.splice(index, 1, text);
                      setFeatures([...newList]);
                    }}
                  />
                </View>
                <FontAwesome5
                  name="times-circle"
                  size={25}
                  color={colors.gray}
                  onPress={() => {
                    onPressDeleteFeature(index);
                  }}
                />
              </View>
            ))}
            <View style={styles.row}>
              <View style={styles.flex9}>
                <AppTextInput
                  placeholder="Add new feature"
                  defaultValue={feature}
                  onChangeText={(text) => setFeature(text)}
                />
              </View>

              <FontAwesome5
                name="plus"
                size={25}
                color={colors.gray}
                onPress={() => {
                  if (feature) {
                    setFeatures([...features, feature]);
                    setFeature("");
                  }
                }}
              />
            </View>
            <AppButton title="Save Update" onPress={saveUpdate} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  bold: { fontWeight: "bold" },
  container: { paddingHorizontal: 10 },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: colors.opaqueBalck,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 5,
    right: 5,
  },
  image: {
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
    margin: 5,
    width: 80,
    backgroundColor: colors.opaqueBalck,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mv10: { marginVertical: 10 },
  primary: { color: colors.primary },
  textContainer: {},
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flex9: { flex: 0.9 },
  flex8: { flex: 0.8 },
  flex7: { flex: 0.7 },
  flex3: { flex: 0.3, textAlign: "right" },
  flex2: { flex: 0.2, textAlign: "right" },
});
export default UpdateProductScreen;
