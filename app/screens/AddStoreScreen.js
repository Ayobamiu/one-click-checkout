import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, EvilIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import AppCheckBox from "../components/AppCheckBox";
import useLocation from "../hooks/useLocation";
import StoreContext from "../contexts/eStore/context";
import useImage from "../hooks/useImage";
import { getAddressV2 } from "../api/getAddress";
import RightHeader from "../components/RightHeader";
import showToast from "../config/showToast";
import storeAPIS from "../api/store";
import UploadScreen from "../components/UploadScreen";
import Screen from "../components/Screen";
import StoresContext from "../contexts/stores/context";

function AddStoreScreen(props) {
  const { setStore } = useContext(StoreContext);
  const { stores, setStores } = useContext(StoresContext);

  const store = props.route.params;
  const [loadingMedia, setloadingMedia] = useState(false);
  const [loadingLocation, setloadingLocation] = useState(false);
  const [banner, setBanner] = useState(store.banner);
  const [location, setLocation] = useState(store.location);
  const [description, setDescription] = useState(store.description);
  const [name, setName] = useState(store.name);
  const [phoneTwo, setphoneTwo] = useState(store.phoneTwo);
  const [phoneOne, setphoneOne] = useState(store.phoneOne);
  const [allowPickup, setallowPickup] = useState(store.allowPickup);
  const [logo, setLogo] = useState(store.logo);
  const [progress, setProgress] = useState(0);
  const [uploadVisible, setUploadVisible] = useState(false);
  const { selectImage } = useImage();
  const { getLocation, countries } = useLocation();
  // React.useLayoutEffect(() => {
  //   props.navigation.setOptions({
  //     headerRight: () => (
  //       <RightHeader
  //         onPress={() => {
  //           handleSubmit();
  //         }}
  //         text="Save Update"
  //       />
  //     ),
  //   });
  // }, [props.navigation]);

  const handleSubmitMedia = async (file) => {
    setloadingMedia(true);
    const newStore = { ...file };

    const result = await storeAPIS.updateStoreMedia(
      newStore,
      store._id,
      (i) => {
        setProgress(i);
      }
    );
    if (result.error) {
      setloadingMedia(false);
      return alert("Could not update store, Try Again");
    }
    // setStore(result.store);
    if (result.store && result.store?._id) {
      const newStores = stores;

      const storeIndex = stores.findIndex((i) => i?._id == store?._id);

      if (storeIndex !== -1) {
        newStores.splice(storeIndex, 1, result.store);

        setStores([...newStores]);
      }
    }
    setloadingMedia(false);
  };
  const handleSubmit = async () => {
    setProgress(0);
    setUploadVisible(true);
    const newStore = {
      location,
      description,
      name,
      phoneTwo,
      phoneOne,
      allowPickup,
    };

    const result = await storeAPIS.updateStore(
      newStore,
      store._id,
      (progress) => {
        setProgress(progress);
      }
    );
    if (result.error) {
      setUploadVisible(false);
      return alert("Could not update store, Try Again");
    }
    if (result.store && result.store?._id) {
      const newStores = stores;

      const storeIndex = stores.findIndex((i) => i?._id == store?._id);

      if (storeIndex !== -1) {
        newStores.splice(storeIndex, 1, result.store);

        setStores([...newStores]);
      }
    }
    setUploadVisible(false);
    props.navigation.goBack();

    // setStore(result.store);
  };
  const onPressDelete = () => {
    Alert.alert(
      "Update Location",
      "Do you want to update to your current Location?",
      [{ text: "Yes", onPress: () => updateLocation() }, { text: "No" }]
    );
  };
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
  return (
    <Screen loading={loadingMedia}>
      <ScrollView style={styles.container}>
        <UploadScreen
          onDone={() => {
            setUploadVisible(false);
            props.navigation.goBack();
          }}
          progress={progress}
          visible={uploadVisible}
        />
        <ImageBackground
          source={{
            uri: banner,
          }}
          style={styles.image}
        >
          <MaterialCommunityIcons
            name="image-area"
            size={30}
            color={colors.opaqueBalck}
            onPress={async () => {
              const result = await selectImage();
              if (result.image) {
                setBanner(result?.image?.uri);

                handleSubmitMedia({
                  banner: {
                    ...result.image,
                    name: `${Date.now().toString()}.jpg`,
                  },
                });
              }
            }}
          />
          <ActivityIndicator animating={loadingMedia} size={20} color="blue" />
          <ImageBackground
            source={{
              uri: logo,
            }}
            style={styles.logo}
          >
            <MaterialCommunityIcons
              name="camera"
              size={30}
              color={colors.opaqueBalck}
              onPress={async () => {
                const result = await selectImage();
                if (result.image) {
                  setLogo(result?.image?.uri);
                  handleSubmitMedia({
                    logo: {
                      ...result.image,
                      name: `${Date.now().toString()}.jpg`,
                    },
                  });
                }
              }}
            />
          </ImageBackground>
        </ImageBackground>

        <View style={styles.inputContainer}>
          <AppText size="medium" style={styles.mv10} onPress={onPressDelete}>
            {!loadingLocation ? (
              <EvilIcons name="location" size={24} color="blue" />
            ) : (
              <ActivityIndicator
                animating={loadingLocation}
                size={20}
                color="blue"
              />
            )}{" "}
            {(location && location.label) || "Unknown Location"}
          </AppText>

          <AppTextInput
            placeholder="Store Name"
            defaultValue={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <AppTextInput
            placeholder="Store Description"
            onChangeText={(text) => {
              setDescription(text);
            }}
            defaultValue={description}
          />
          <AppTextInput
            placeholder="Phone One"
            onChangeText={(text) => {
              setphoneOne(text);
            }}
            defaultValue={phoneOne}
          />
          <AppTextInput
            placeholder="Phone Two (optional)"
            onChangeText={(text) => {
              setphoneTwo(text);
            }}
            defaultValue={phoneTwo}
          />

          {/* <AppPicker
    items={countries}
    id="_id"
    displayProperty="name"
    placeholder="Select Country"
    selectedItem={selectedCountry}
    onSelectItem={async (item) => {
    setSelectedCountry(item);
    setCountry(item.name);
    const states = await getStatesInountry(item.iso2);
    setStates(states);
    }}
    />
    <AppPicker
    items={states}
    id="_id"
    displayProperty="name"
    placeholder="Select State"
    selectedItem={selectedState}
    onSelectItem={async (item) => {
    setSelectedState(item);
    setState(item.name);
    const cities = await getCitiesInStates(
    selectedCountry.iso2,
    item.iso2
    );
    setCities(cities);
    }}
    />
    <AppPicker
    items={cities}
    id="_id"
    displayProperty="name"
    placeholder="Select City"
    selectedItem={selectedCity}
    onSelectItem={() => {
    setSelectedCity();
    setCity(item.name);
    }}
    /> */}

          <AppCheckBox
            onPress={(text) => {
              setallowPickup(text);
            }}
            title="Buyers can pick up at your center"
            defaultChecked={allowPickup}
            style={styles.mv10}
          />
          <AppButton
            onPress={handleSubmit}
            title="Update Store"
            fullWidth
            style={styles.mv10}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  aligItemsRight: {
    alignItems: "flex-end",
  },
  aligRight: {
    textAlign: "right",
    marginVertical: 10,
    color: colors.primary,
  },
  container: { flex: 1 },
  inputContainer: {
    paddingHorizontal: 16,
  },
  image: {
    backgroundColor: colors.opaqueBalck,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    marginBottom: 40,
  },
  logo: {
    position: "absolute",
    bottom: -30,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
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
export default AddStoreScreen;
