import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { Image } from "react-native-expo-image-cache";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import onShare from "../config/onShare";
import showToast from "../config/showToast";
import copyToClipboard from "../config/copyToClipboard";

function ProductOptionsModal({
  header,
  text,
  onPressImage = () => {},
  imageUri,
  thumbnailUri,
  item,
  navigation,
  showModal,
  setShowModal,
}) {
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
    <Modal
      visible={showModal}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      style={styles.modal}
    >
      <ImageBackground
        style={StyleSheet.absoluteFillObject}
        source={{ uri: imageUri }}
        blurRadius={50}
      />
      <Pressable
        style={styles.modalTop}
        onPress={() => {
          setShowModal(false);
        }}
      />
      <View style={styles.modalBottom}>
        <View>
          <FontAwesome5
            name="times"
            size={20}
            color={colors.gray3}
            onPress={() => setShowModal(false)}
            style={{ position: "absolute", top: 20, right: 20, zIndex: 2 }}
          />
          <Image
            uri={imageUri}
            preview={{ uri: thumbnailUri }}
            tint="light"
            style={styles.previewImage}
            onPress={onPressImage}
            resizeMode="cover"
          />
          <View style={[{ flex: 1 }, styles.previewContainer]}>
            <AppText size="medium" style={styles.text} numberOfLines={2}>
              {text}
            </AppText>
            <AppText size="medium" fontWeight="bold" style={styles.header}>
              &#8358;{header}
            </AppText>
          </View>
        </View>
        <View>
          <ActionItem
            icon={<Feather name="copy" size={30} color={colors.medium} />}
            text="Copy Link"
            onPress={() => {
              showToast("Link copied to Clipboard!");
              copyToClipboard(
                `${item.title} \n ${item.price} \n https://www.monaly.co/product/${item._id}`
              );
            }}
          />
          <ActionItem
            icon={
              <MaterialCommunityIcons
                name="share"
                size={30}
                color={colors.medium}
              />
            }
            text="Share"
            onPress={() => {
              onShare(
                `https://www.monaly.co/product/${item._id}`,
                `${item.title}- ${item.price}`,
                item.title
              );
            }}
          />

          <ActionItem
            icon={<Feather name="edit-2" size={30} color={colors.medium} />}
            text="Edit"
            onPress={() => {
              navigation.navigate("Products", {
                screen: "Edit Product",
                initial: false,
                params: item,
              });
            }}
          />
        </View>
      </View>
    </Modal>
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

  closeModalContainer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  header: { color: colors.black, marginTop: 8 },
  icon: { color: colors.black, margin: 16, marginRight: 20 },

  modal: {
    backgroundColor: colors.opaqueBalck,
    width: "100%",
    flex: 1,
  },
  modalBottom: {
    backgroundColor: colors.white,
    width: "70%",
    borderTopRightRadius: 16,
    borderRadius: 16,
    overflow: "hidden",
    flexShrink: 1,
    position: "absolute",
    bottom: 100,
    left: 20,
  },
  modalTop: {
    backgroundColor: colors.opaqueBalck,
    width: "100%",
    flex: 1,
  },
  previewContainer: {
    // flexDirection: "row",
    padding: 10,
  },
  previewImage: {
    width: "100%",
    height: 150,
    backgroundColor: colors.grey,
    justifyContent: "center",
    overflow: "hidden",
    resizeMode: "cover",
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
  },
  text: { color: colors.black },
});
export default ProductOptionsModal;
