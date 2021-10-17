import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import AppForm from "../components/Forms/AppForm";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";
import AppText from "../components/AppText";
import UploadScreen from "../components/UploadScreen";
import colors from "../config/colors";
import FormSingleImagePicker from "../components/Forms/FormSingleImagePicker";
import storeAPIS from "../api/store";
import useLocation from "../hooks/useLocation";
import { getAddressV2 } from "../api/getAddress";
import showToast from "../config/showToast";
import StoresContext from "../contexts/stores/context";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Store Name"),
  description: Yup.string().required().label("Store Description"),
  phoneOne: Yup.string().required().label("Phone One"),
  phoneTwo: Yup.string().nullable().label("Phone Two"),
  logo: Yup.object().nullable().label("Logo"),
  banner: Yup.object().nullable().label("Banner"),
  allowPickup: Yup.boolean().nullable().label("Banner"),
});

function MultiStepStoreForm(props) {
  const { width, height } = useWindowDimensions();
  const { stores, setStores } = useContext(StoresContext);

  const bigCardHeight = height * 0.7;
  const smallCardHeight = height * 0.2;
  const bigCardText = bigCardHeight / 12;
  const smallCardText = smallCardHeight / 5;
  const numberOfComponents = 3;
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingLocation, setloadingLocation] = useState(false);
  const [location, setLocation] = useState(null);
  const [index, setIndex] = useState(0);
  const { getLocation } = useLocation();

  const updateLocation = async () => {
    setloadingLocation(true);
    const pp = await getLocation();
    await getAddressV2(
      "3b4c10a64fff96eaf6167a0c4c3926d5",
      pp.coords.latitude,
      pp.coords.longitude
    )
      .catch((error) => {
        showToast("Could not get your loaction. Try again!");
      })
      .then((response) => {
        if (response) {
          setLocation(response);
        } else {
          showToast("Could not get your loaction. Try again!");
        }
      });
    setloadingLocation(false);
  };

  const handleSubmit = async (product, { resetForm }) => {
    product.location = location;
    if (product.logo) {
      product.logo = {
        ...product.logo,
        name: `logo${Date.now().toString()}.jpg`,
      };
    }
    if (product.banner) {
      product.banner = {
        ...product.banner,
        name: `banner${Date.now().toString()}.jpg`,
      };
    }

    setProgress(0);
    setUploadVisible(true);
    const result = await storeAPIS.addStore(product, (progress) =>
      setProgress(progress)
    );

    if (result.error) {
      setUploadVisible(false);
      return alert("Could not register store");
    }
    if (result.store && result.store._id) {
      setStores([result.store, ...stores]);
      resetForm();
      setTimeout(() => {
        props.navigation.navigate("Select Store");
      }, 200);
    }
    setUploadVisible(false);
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
    if (index < numberOfComponents) {
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
      {index !== numberOfComponents && (
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
          <AppText size="x-small" style={[styles.detailstext, styles.mv15]}>
            Add store details to make it easy for your customers to make their
            choice. Your store name is a very important part of your brand.
          </AppText>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <AppFormField placeholder="Store Name" name="name" />

          <AppFormField
            placeholder="Store Description"
            name="description"
            multiline
            numberOfLines={4}
          />
        </ScrollView>

        <NavButton />
      </View>
    );
  };
  const ContactScreen = ({ visible = false }) => {
    if (!visible) return null;
    return (
      <View style={styles.child}>
        <View style={styles.details}>
          <AppText size="x-small" style={[styles.detailstext, styles.mv15]}>
            This is your main point of contact. Customers and dispatch merchants
            will contact you on these.
          </AppText>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <AppFormField
            keyboardType="number-pad"
            placeholder="Phone One"
            name="phoneOne"
          />
          <AppFormField
            keyboardType="number-pad"
            placeholder="Phone Two"
            name="phoneTwo"
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
          <AppText size="x-small" style={[styles.detailstext, styles.mv15]}>
            Your logo says a lot about your brand. Make your Store distinctive
            Select a logo and a banner image.
          </AppText>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={[styles.header, styles.h160]}>
            <AppText size="input" style={styles.header}>
              Select a logo for your store
            </AppText>

            <FormSingleImagePicker name="logo" rounded />
          </View>
          <View style={[styles.header, styles.h160]}>
            <AppText size="input" style={styles.header}>
              Add a banner Image
            </AppText>

            <FormSingleImagePicker name="banner" />
          </View>
        </ScrollView>
        <NavButton />
      </View>
    );
  };
  const AddressScreen = ({ visible = false }) => {
    if (!visible) return null;
    return (
      <View style={styles.child}>
        <View style={styles.details}>
          <AppText size="x-small" style={[styles.detailstext, styles.mv15]}>
            Add Address details, this is very essential for dispatch merchant
            and customers to pick up products at your store.
          </AppText>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <AppText size="medium" style={styles.mv10} onPress={updateLocation}>
            {!loadingLocation ? (
              <EvilIcons name="location" size={24} color="blue" />
            ) : (
              <ActivityIndicator
                animating={loadingLocation}
                size={20}
                color="blue"
              />
            )}{" "}
            {(location && "Update Location") || "Set current Location"}
          </AppText>
          {location && (
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
                padding: bigCardText,
                marginVertical: 10,
                position: "relative",
              }}
            >
              <AppText
                size="header"
                style={{
                  color: colors.white,
                  fontWeight: "600",
                  fontSize: bigCardText,
                  marginBottom: 15,
                }}
              >
                {location?.label}
              </AppText>
              <AppText size="x-small" style={{ color: colors.white }}>
                {location?.region} {location?.country}
              </AppText>
              <AppText size="x-small" style={{ color: colors.white }}>
                {location?.continent}
              </AppText>
            </View>
          )}
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
          <SubmitButton title="Save Store" fullWidth secondary />
        </View>
      </View>
    );
  };
  return (
    <View>
      <UploadScreen
        onDone={() => {
          setUploadVisible(false);
          // props.navigation.navigate("Home");
        }}
        progress={progress}
        visible={uploadVisible}
      />
      <AppForm
        initialValues={{
          name: "",
          description: "",
          phoneOne: "",
          phoneTwo: "",
          logo: null,
          // location: null,
          banner: null,
          allowPickup: true,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <BasicDetailsScreen visible={index === 0} />
        <ContactScreen visible={index === 1} />
        <MediaUploadScreen visible={index === 2} />
        <AddressScreen visible={index === 3} sendFeatures={getFeatures} />
      </AppForm>
    </View>
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
    backgroundColor: colors.basmati,
    padding: 15,
    justifyContent: "center",
    paddingVertical: 25,
  },
  detailstext: { color: colors.peppercorn },
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
  aligItemsRight: {
    alignItems: "flex-end",
  },
  aligRight: {
    textAlign: "right",
    marginVertical: 10,
    color: colors.primary,
  },
  inputContainer: {
    padding: 16,
  },
  image: {
    backgroundColor: colors.opaqueBalck,
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  logo: {
    position: "absolute",
    bottom: -50,
    left: 50,
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    borderColor: colors.white,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  mv10: {
    marginVertical: 10,
  },
  primary: {
    color: colors.primary,
  },
});
export default MultiStepStoreForm;
