import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ImageBackground,
  Share,
} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import onShare from "../config/onShare";

function ContentBlockLarge({
  header,
  subHeader,
  text,
  onPressImage,
  onPress,
  style,
  imageUri,
}) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <ImageBackground
        source={{ uri: imageUri }}
        style={styles.image}
        onPress={onPressImage}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <AppText
          size="medium"
          fontWeight="bold"
          style={styles.header}
          numberOfLines={2}
        >
          {header}
        </AppText>
        <AppText size="x-small" style={styles.text} numberOfLines={2}>
          {text}
        </AppText>
        <AppText size="x-small" style={styles.subHeader}>
          {subHeader}
        </AppText>
      </View>
      <View style={[styles.iconContainer]}>
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
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
    height: 380,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 1,
  },
  header: { color: colors.black, marginTop: 8 },
  icon: { marginHorizontal: 10 },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 8,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: colors.grey,
    justifyContent: "center",
    overflow: "hidden",
  },
  subHeader: { color: colors.gray3, marginTop: 8 },
  text: { color: colors.black, marginTop: 8 },
  textContainer: { flex: 1, width: "100%", height: 240, padding: 8 },
});
export default ContentBlockLarge;
