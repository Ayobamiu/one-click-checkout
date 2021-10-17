import React, { useContext } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import colors from "../config/colors";
import Screen from "../components/Screen";
import {
  FlatList,
  Pressable,
  useWindowDimensions,
  View,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import AppText from "../components/AppText";
import SectionHeader from "../components/SectionHeader";
import useStore from "../hooks/useEStore";
import { ScrollView } from "react-native-gesture-handler";
import SelectedStoreContext from "../contexts/selectedStore/context";
import { store } from "../utility/cache";
import LottieView from "lottie-react-native";
import StoresContext from "../contexts/stores/context";

function SelectStoreScreen(props) {
  const { width, height } = useWindowDimensions();
  const { stores, setStores } = useContext(StoresContext);

  const { error, loadStores, loading } = useStore();
  const [refreshing, setRefreshing] = React.useState(false);
  const { selectedStore, setSelectedStore } = useContext(SelectedStoreContext);
  const colorsSelections = [
    { backgroundColor: colors.cavendish, color: colors.peppercorn },
    { backgroundColor: colors.peppercorn, color: colors.white },
    { backgroundColor: colors.white, color: colors.peppercorn },
    { backgroundColor: colors.basmati, color: colors.peppercorn },
  ];
  // const [selectedStore, setSelectedStore] = useState(null);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    (async () => {
      setRefreshing(true);
      // wait(2000).then(() => setRefreshing(false));
      await loadStores();
      setRefreshing(false);
    })();
  }, []);
  const bigCardHeight = height * 0.7;
  const smallCardHeight = height * 0.2;
  const bigCardText = bigCardHeight / 12;
  const smallCardText = smallCardHeight / 5;
  // const stores = [
  //   // { _id: "17251", name: "Store No. 1" },
  //   // { _id: "17252", name: "Store No. 2" },
  //   // { _id: "17253", name: "Store No. 3" },
  // ];

  const goToAddStorePage = () => {
    props.navigation.navigate("Add Store");
  };
  return (
    <Screen style={{ paddingTop: 50 }} loading={loading}>
      <FlatList
        contentContainerStyle={{
          width: width * 0.9,
          marginHorizontal: width * 0.05,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={stores}
        keyExtractor={(item) => item?._id}
        renderItem={({
          item,
          colorsSelected = colorsSelections[
            Math.floor(Math.random() * colorsSelections.length)
          ],
        }) => (
          <Pressable
            style={{
              height: smallCardHeight,
              width: "100%",
              borderRadius: 32,
              backgroundColor: colorsSelected.backgroundColor,
              justifyContent: "flex-start",
              padding: smallCardText,
              marginVertical: 10,
              position: "relative",
              paddingHorizontal: 25,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
            onPress={async () => {
              await store("selectedStore", item);
              setSelectedStore(item);
            }}
          >
            {selectedStore?._id == item._id && (
              <Feather
                name="check-circle"
                size={smallCardText}
                color={colorsSelected.color}
                style={{
                  position: "absolute",
                  top: smallCardText,
                  right: smallCardText,
                }}
              />
            )}
            <Ionicons
              name="ios-open-outline"
              size={smallCardText}
              color={colorsSelected.color}
              style={{
                position: "absolute",
                bottom: smallCardText,
                right: smallCardText,
              }}
            />

            <AppText
              size="header"
              style={{
                color: colorsSelected.color,
                fontSize: smallCardText,
                fontWeight: "bold",
              }}
            >
              {item?.name}
            </AppText>
            <AppText
              style={{
                color: colors.peppercorn,
              }}
            >
              {item?.location?.label}
            </AppText>
          </Pressable>
        )}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <AppText
              size="large"
              style={{ fontWeight: "bold", color: colors.peppercorn }}
            >
              Select a Store
            </AppText>
            <ActivityIndicator color={colors.primary} animating={loading} />
            <Feather
              name="plus-circle"
              size={smallCardHeight / 5}
              color={colors.peppercorn}
              onPress={goToAddStorePage}
            />
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <View
              style={{
                height: bigCardHeight,
                width: "100%",
                borderRadius: 32,
                backgroundColor: colors.white,
                justifyContent: "flex-start",
                padding: bigCardText,
                marginVertical: 10,
                position: "relative",
              }}
            >
              <LottieView
                source={require("../assets/animations/loading_dots.json")}
                autoPlay
                loop
              />
            </View>
          ) : !loading && error ? (
            <AppText>Error while fetching stores</AppText>
          ) : (
            <Pressable
              style={{
                height: bigCardHeight,
                width: "100%",
                borderRadius: 32,
                backgroundColor: colors.peppercorn,
                justifyContent: "flex-start",
                padding: bigCardText,
                marginVertical: 10,
                position: "relative",
              }}
              onPress={goToAddStorePage}
            >
              <Feather
                name="plus-circle"
                size={bigCardText}
                color={colors.white}
                style={{
                  position: "absolute",
                  bottom: bigCardText,
                  right: bigCardText,
                }}
                onPress={goToAddStorePage}
              />
              <AppText
                // size="large"
                style={{
                  color: colors.white,
                  fontWeight: "600",
                  fontSize: bigCardText,
                  // lineHeight: 40,
                }}
              >
                Add a new store to get started
              </AppText>
            </Pressable>
          )
        }
      />
    </Screen>
  );
}

export default SelectStoreScreen;
