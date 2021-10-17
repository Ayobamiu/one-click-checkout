import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import colors from "../config/colors";
function OrderStatusComponent({ icon, label, done = false, warning = false }) {
  const color = done ? colors.success : warning ? colors.warning : colors.black;
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={25}
          color={color}
          style={styles.mr15}
        />
      )}
      <AppText size="medium" fontWeight="bold" style={{ color }}>
        {label}
      </AppText>
      <MaterialCommunityIcons
        name="check"
        size={25}
        color={color}
        style={styles.mlAuto}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.faded,
    marginVertical: 5,
  },
  mlAuto: {
    marginLeft: "auto",
  },
  mr15: {
    marginRight: 15,
  },
});
export default OrderStatusComponent;
