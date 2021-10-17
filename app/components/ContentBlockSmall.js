import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ImageBackground,
  Alert,
  Share,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import onShare from "../config/onShare";
import ProductOptionsModal from "./ProductOptionsModal";

function ContentBlockSmall({
  header,
  subHeader,
  text,
  onPressImage,
  onPress,
  style,
  imageUri,
  roundedImage = false,
  renderRightActions,
  renderLeftActions,
  onDelete,
  onSwipeableRightWillOpen,
  onSwipeableLeftWillOpen,
  iconsComponent,
  navigation,
  item,
  thumbnailUri,
}) {
  const onPressDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this product?", [
      { text: "Yes", onPress: () => onDelete() },
      { text: "No" },
    ]);
  };
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <Pressable style={[styles.row]} onPress={onPress}>
        <ProductOptionsModal
          header={subHeader}
          text={`${header} -${text}`}
          // onPressImage={onPressImage}
          imageUri={imageUri}
          thumbnailUri={thumbnailUri}
          item={item}
          navigation={navigation}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <ImageBackground
          style={[styles.image, roundedImage ? styles.rounded : styles.br8]}
          onPress={onPressImage}
          source={{ uri: imageUri }}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <View style={styles.headerSection}>
            <AppText
              size="medium"
              fontWeight="bold"
              style={[styles.header, styles.bold]}
              numberOfLines={2}
            >
              {header}
            </AppText>
            <AppText size="x-small" style={styles.subHeader} numberOfLines={1}>
              &#8358;{subHeader}
            </AppText>
          </View>
          <AppText style={styles.text} numberOfLines={2} size="x-small">
            {text}
          </AppText>
        </View>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={30}
          color={colors.medium}
          style={styles.icon}
          onPress={() => {
            setShowModal(true);
          }}
        />
      </Pressable>
      {/* <View style={[styles.iconContainer]}>
        <MaterialCommunityIcons
          name="share"
          size={15}
          color={colors.black}
          style={styles.icon}
          onPress={() => {
            onShare("Monaly App for the sellers");
          }}
        />
        <MaterialCommunityIcons
          name="dots-vertical"
          size={15}
          color={colors.black}
          style={styles.icon}
        />
      </View> */}
      {iconsComponent}
    </View>
  );
}
const styles = StyleSheet.create({
  bold: { fontWeight: "bold" },
  br8: { borderRadius: 8 },
  container: {
    width: "100%",
    backgroundColor: colors.white,
    paddingVertical: 10,
  },
  header: { color: colors.black, flex: 0.7 },
  headerSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  icon: { marginHorizontal: 10, alignSelf: "center" },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: colors.grey,
    justifyContent: "center",
    overflow: "hidden",
    marginHorizontal: 16,
  },
  rounded: { borderRadius: 25 },
  subHeader: { color: colors.gray3, flex: 0.3, textAlign: "right" },
  text: { color: colors.black, marginVertical: 5 },
  textContainer: { flex: 1 },
  row: { flexDirection: "row", alignItems: "flex-start" },
});
export default ContentBlockSmall;
// <Swipeable
// renderLeftActions={renderLeftActions}
// renderRightActions={renderRightActions}
// onSwipeableRightWillOpen={onSwipeableRightWillOpen}
// onSwipeableLeftWillOpen={onSwipeableLeftWillOpen}
// containerStyle={{ backgroundColor: colors.light, height: 120 }}
// onPress={onPress}
// >
