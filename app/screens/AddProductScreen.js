import React, { useContext, useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import Screen from "../components/Screen";
import * as Yup from "yup";
import AppForm from "../components/Forms/AppForm";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";
import AppText from "../components/AppText";
import FormImagePicker from "../components/Forms/FormImagePicker";
import AppFormCheckbox from "../components/Forms/AppFormCheckbox";
import FormVideoPicker from "../components/Forms/FormVideoPicker";
import productAPIS from "../api/products";
import UploadScreen from "../components/UploadScreen";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import colors from "../config/colors";
import ProductContext from "../contexts/product/context";
import SelectedStoreContext from "../contexts/selectedStore/context";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Product Title"),
  description: Yup.string().required().label("Product Description"),
  price: Yup.number().required().label("Price"),
  numberInStock: Yup.number().required().label("Number of Product in Stock"),
  images: Yup.array().required().max(10).label("Images"),
  video: Yup.string().nullable().label("Video"),
  returnable: Yup.boolean()
    .required()
    .nullable()
    .label("Is Product Returnable?"),
});

function AddProductScreen(props) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [feature, setFeature] = useState("");
  const [features, setFeatures] = useState([]);
  const { products, setProducts } = useContext(ProductContext);
  const { selectedStore, setSelectedStore } = useContext(SelectedStoreContext);

  const onDeleteFeature = (index) => {
    const newList = features;
    newList.splice(index, 1);
    setFeatures([...newList]);
  };
  const onPressDeleteFeature = (index) => {
    Alert.alert("Delete", "Are you sure you want to delete this feature?", [
      { text: "Yes", onPress: () => onDeleteFeature(index) },
      { text: "No" },
    ]);
  };
  const [progress, setProgress] = useState(0);
  const handleSubmit = async (product) => {
    // setProgress(0);
    // setUploadVisible(true);
    // const result = await productAPIS.addProduct(
    //   {
    //     ...product,
    //     store: selectedStore._id,
    //   },
    //   (progress) => setProgress(progress)
    // );
    // if (result.error) {
    //   setUploadVisible(false);
    //   return alert("Could not save product");
    // }
    // resetForm();
    // setProducts([result.product, ...products]);
  };

  return (
    <Screen>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <AppForm
          initialValues={{
            title: "",
            description: "",
            price: "",
            numberInStock: "",
            images: [],
            video: null,
            returnable: true,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={[styles.header, styles.h160]}>
            <AppText size="input" style={styles.header}>
              Select multiple Images
            </AppText>

            <FormImagePicker name="images" />
          </View>
          <AppFormField placeholder="Product Title" name="title" />

          <AppFormField
            placeholder="Product Description"
            name="description"
            multiline
            numberOfLines={4}
          />

          <AppFormField
            keyboardType="number-pad"
            placeholder="Price"
            name="price"
          />

          <AppFormField
            keyboardType="number-pad"
            name="numberInStock"
            placeholder="Number of Products in Stock"
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
          <FormVideoPicker name="video" style={[styles.header, styles.mv10]} />

          <View style={[styles.header, styles.mv10]}>
            <AppFormCheckbox
              title="This product is returnable?"
              name="returnable"
            />
          </View>

          <SubmitButton title="Add Product" style={styles.mtAuto} fullWidth />
        </AppForm>
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  alignStart: {
    alignSelf: "flex-start",
  },
  bold: { fontWeight: "bold" },

  container: {
    padding: 16,
  },
  h160: { height: 160 },
  header: { alignSelf: "flex-start" },
  justifyLeft: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mv10: { marginVertical: 10 },
  primary: { color: colors.primary },

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
export default AddProductScreen;
