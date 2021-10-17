import React from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function OrderItem({ header, subHeader, text, onPress, style, price }) {
  return (
    <View style={[styles.container, style]}>
      <Pressable style={[styles.row]} onPress={onPress}>
        <View style={[styles.image, styles.rounded]}>
          <MaterialCommunityIcons
            name="shopping"
            size={20}
            color={colors.white}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.headerSection}>
            <AppText
              size="medium"
              fontWeight="bold"
              style={styles.header}
              numberOfLines={2}
            >
              {header}
            </AppText>
            <AppText size="x-small" style={styles.subHeader} numberOfLines={1}>
              {subHeader}
            </AppText>
          </View>
          <View style={styles.headerSection}>
            <AppText style={styles.header} numberOfLines={2} size="input">
              {text}
            </AppText>
            <AppText size="medium" style={styles.price} numberOfLines={1}>
              &#8358;{price}
            </AppText>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.white,
    padding: 10,
  },
  header: { color: colors.black, flex: 0.6 },
  headerSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  icon: { marginHorizontal: 10 },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    overflow: "hidden",
    marginRight: 16,
    alignItems: "center",
  },
  rounded: { borderRadius: 20 },
  price: { color: colors.black, flex: 0.3, textAlign: "right" },
  subHeader: { color: colors.gray3, flex: 0.3, textAlign: "right" },
  text: { color: colors.black, marginVertical: 5 },
  textContainer: { flex: 1 },
  row: { flexDirection: "row", alignItems: "flex-start" },
});
export default OrderItem;
