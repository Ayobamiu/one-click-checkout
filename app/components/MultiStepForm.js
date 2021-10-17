import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
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
import { FontAwesome5 } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import colors from "../config/colors";
import ProductContext from "../contexts/product/context";
import SelectedStoreContext from "../contexts/selectedStore/context";
// import { Header } from 'react-navigation-stack';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Product Title"),
  description: Yup.string().required().label("Product Description"),
  price: Yup.number().required().label("Price"),
  numberInStock: Yup.number().required().label("Number of Product in Stock"),
  images: Yup.array().required().max(10).label("Images"),
  video: Yup.object().nullable().label("Video"),
  returnable: Yup.boolean()
    .required()
    .nullable()
    .label("Is Product Returnable?"),
});

function MultiStepForm(props) {
  const { products, setProducts } = useContext(ProductContext);
  const { selectedStore, setSelectedStore } = useContext(SelectedStoreContext);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [index, setIndex] = useState(0);

  let featurez = [];
  const handleSubmit = async (product) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await productAPIS.addProduct(
      {
        ...product,
        features: featurez,
        store: selectedStore._id,
      },
      (progress) => setProgress(progress)
    );

    setUploadVisible(false);
    if (result.error) {
      setUploadVisible(false);
      return alert("Could not save product");
    }
    setProducts([result.product, ...products]);
    // resetForm();
  };

  const getFeatures = (childData) => {
    featurez = childData;
  };

  const gotoPrev = () => {
    if (index > 0) {
      setIndex((curr) => curr - 1);
    }
  };
  const gotoNext = () => {
    if (index < 2) {
      setIndex((curr) => curr + 1);
    }
  };
  const NavButton = () => (
    <View style={styles.navContainer}>
      {index !== 0 && (
        <Pressable
          onPress={() => {
            gotoPrev();
          }}
          style={[styles.navItem, styles.previous]}
        >
          <AntDesign name="left" color={colors.medium} size={20} />
          <AppText style={[styles.navText]}>Previous</AppText>
        </Pressable>
      )}
      {index !== 2 && (
        <Pressable
          onPress={() => {
            gotoNext();
          }}
          style={[styles.navItem, styles.next]}
        >
          <AppText style={[styles.navText]}>Next</AppText>
          <AntDesign name="right" color={colors.medium} size={20} />
        </Pressable>
      )}
    </View>
  );

  const BasicDetailsScreen = ({ visible = false }) => {
    if (!visible) return null;
    return (
      <View style={styles.child}>
        <View style={styles.details}>
          <AppText style={[styles.detailstext, styles.mv15]}>
            Add product details to make it easy for your customers to make their
            choice. Add a catchy title, a comprehensive description and price.
          </AppText>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
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
          <AppText size="medium" style={[styles.mv10]}>
            We will notify you when you are running out of stock.
          </AppText>
          <AppFormField
            keyboardType="number-pad"
            name="numberInStock"
            placeholder="Number of Products in Stock"
          />
        </ScrollView>

        <NavButton />
      </View>
    );
  };
  const MediaUploadScreen = ({ visible = false }) => {
    if (!visible) return null;
    return (
      <View style={styles.child}>
        <View style={styles.details}>
          <AppText style={[styles.detailstext, styles.mv15]}>
            Customers respond better to visuals. Upload informative images and
            video of the product. You can upload multiple Images.
          </AppText>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={[styles.header, styles.h160]}>
            <AppText size="input" style={styles.header}>
              Select multiple Images
            </AppText>

            <FormImagePicker name="images" />
          </View>
          <FormVideoPicker name="video" style={[styles.header, styles.mv10]} />
        </ScrollView>
        <NavButton />
      </View>
    );
  };
  const KeyFeaturesScreen = ({ visible = false, sendFeatures }) => {
    const onDeleteFeature = (index) => {
      const newList = features;
      newList.splice(index, 1);
      setFeatures([...newList]);
      featurez = [...newList];
    };

    const onPressDeleteFeature = (index) => {
      Alert.alert("Delete", "Are you sure you want to delete this feature?", [
        { text: "Yes", onPress: () => onDeleteFeature(index) },
        { text: "No" },
      ]);
    };
    const [feature, setFeature] = useState("");

    const [features, setFeatures] = useState([]);
    if (!visible) return null;
    return (
      <View style={styles.child}>
        <View style={styles.details}>
          <AppText style={[styles.detailstext, styles.mv15]}>
            Highlight the key features of the product here. Convince your
            customers that this is the right product. Press{" "}
            <FontAwesome5
              name="plus"
              size={15}
              color={colors.gray}
              onPress={() => {
                //   onPressDeleteFeature(index);
              }}
            />{" "}
            to add and{" "}
            <FontAwesome5
              name="times-circle"
              size={15}
              color={colors.gray}
              onPress={() => {
                //   onPressDeleteFeature(index);
              }}
            />{" "}
            to delete.
          </AppText>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
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
                  featurez = [...features, feature];
                }
              }}
            />
          </View>

          <AppText size="medium" style={[styles.mv10]}>
            Can your customers return the product if it is deemed not fit?
          </AppText>

          <View style={[styles.header, styles.mv10]}>
            <AppFormCheckbox
              title="This product is returnable?"
              name="returnable"
            />
          </View>
        </ScrollView>
        <View style={[styles.navContainer, { paddingVertical: 5 }]}>
          <Pressable
            onPress={() => {
              gotoPrev();
            }}
            style={styles.navItem}
          >
            <AntDesign name="left" color={colors.medium} size={20} />
            <AppText style={[styles.navText]}>Previous</AppText>
          </Pressable>
          <SubmitButton title="Add Product" fullWidth secondary />
        </View>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      contentContainerStyle={styles.child}
    >
      <UploadScreen
        onDone={() => {
          setUploadVisible(false);
          props.navigation.navigate("Activity");
        }}
        progress={progress}
        visible={uploadVisible}
      />
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
        <BasicDetailsScreen visible={index === 0} />
        <MediaUploadScreen visible={index === 1} />
        <KeyFeaturesScreen visible={index === 2} sendFeatures={getFeatures} />
      </AppForm>
    </KeyboardAvoidingView>
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
  child: {
    height: "100%",
    width: "100%",
  },
  details: {
    backgroundColor: colors.medium,
    padding: 15,
    // minHeight: 200,
    justifyContent: "center",
  },
  detailstext: { color: colors.white, fontSize: 13 },
  h160: { height: 160 },
  header: { alignSelf: "flex-start" },
  justifyLeft: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mv15: { marginVertical: 15 },
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
  navContainer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    backgroundColor: colors.grey,
    borderTopColor: colors.grey,
    borderTopWidth: 1,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  navText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  previous: { marginRight: "auto" },
  next: { marginLeft: "auto" },
});
export default MultiStepForm;
