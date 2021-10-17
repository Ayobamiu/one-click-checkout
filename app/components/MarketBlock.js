import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { Image } from "react-native-expo-image-cache";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import onShare from "../config/onShare";
import showToast from "../config/showToast";
import copyToClipboard from "../config/copyToClipboard";
import ProductOptionsModal from "./ProductOptionsModal";

function MarketBlock({
  header,
  text,
  onPressImage = () => {},
  onPress = () => {},
  style,
  imageUri,
  thumbnailUri,
  item,
  navigation,
}) {
  const [showModal, setShowModal] = useState(false);
  const ActionItem = ({ onPress, text, icon }) => (
    <TouchableOpacity
      style={[styles.actionItem]}
      onPress={() => {
        onPress();
      }}
    >
      <TouchableOpacity
        style={[styles.icon]}
        onPress={() => {
          // onPress();
        }}
      >
        {icon}
      </TouchableOpacity>
      <AppText size="medium" style={[styles.text, styles.bold]}>
        {text}
      </AppText>
    </TouchableOpacity>
  );
  return (
    <Pressable
      style={[styles.container, style]}
      onLongPress={() => {
        setShowModal(!showModal);
      }}
      onPress={onPress}
    >
      <ProductOptionsModal
        header={header}
        text={text}
        // onPressImage={onPressImage}
        imageUri={imageUri}
        thumbnailUri={thumbnailUri}
        item={item}
        navigation={navigation}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <Image
        uri={imageUri}
        preview={{ uri: thumbnailUri }}
        tint="light"
        style={styles.image}
        onPress={onPressImage}
      />
      <View style={styles.textContainer}>
        <AppText style={[styles.text]} numberOfLines={1}>
          {text}
        </AppText>
        <AppText size="input" style={[styles.text, styles.bold]}>
          &#8358;{header}
        </AppText>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  container: {
    // maxWidth: 160,
    marginVertical: 8,

    overflow: "hidden",
  },
  closeModalContainer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray,
  },
  fsz20: { fontSize: 20 },
  header: { color: colors.black, marginTop: 8 },
  icon: { color: colors.black, margin: 16, marginRight: 20 },
  image: {
    width: 250,
    height: 250,
    backgroundColor: colors.grey,
    justifyContent: "center",
    overflow: "hidden",
    resizeMode: "contain",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.gray,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
    borderRadius: 8,
  },
  modal: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.opaqueBalck,
  },
  modalBottom: {
    backgroundColor: colors.white,
    width: "100%",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    overflow: "hidden",
    // flexGrow: 1,
    flexShrink: 1,
    paddingBottom: 30,
  },
  modalTop: {
    backgroundColor: colors.opaqueBalck,
    width: "100%",
    flex: 1,
  },
  previewContainer: {
    flexDirection: "row",
    padding: 10,
  },
  previewImage: {
    width: 150,
    height: 110,
    backgroundColor: colors.grey,
    justifyContent: "center",
    overflow: "hidden",
    resizeMode: "cover",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.gray,
    marginRight: 19,
  },
  text: { color: colors.black },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
    height: 40,
  },
  white: { color: colors.white },
});
export default MarketBlock;
