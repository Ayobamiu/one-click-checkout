import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function DataItem({ text, subtext, status = "completed", time, type }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {status === "completed" && (
          <MaterialCommunityIcons
            name="check-circle"
            size={20}
            color={colors.success}
            style={styles.mr}
          />
        )}
        {status === "failed" && (
          <MaterialCommunityIcons
            name="alert-circle-check"
            size={20}
            color={colors.danger}
            style={styles.mr}
          />
        )}
        {status === "pending" && (
          <MaterialCommunityIcons
            name="progress-alert"
            size={20}
            color={colors.warning}
            style={styles.mr}
          />
        )}

        <AppText style={styles.text} size="medium" fontWeight="medium">
          {text}
        </AppText>
        <AppText
          style={[
            styles.mlAuto,
            type === "plus" ? styles.success : styles.danger,
            styles.bold,
          ]}
          size="x-small"
        >
          {type === "plus" ? "+" : "-"} {subtext}
        </AppText>
      </View>
      <AppText style={styles.gray} size="x-small" fontWeight="medium">
        {time}
      </AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  ball: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginRight: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  container: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  danger: {
    color: colors.danger,
  },
  gray: {
    color: colors.medium,
  },
  mlAuto: {
    marginLeft: "auto",
  },
  mr: { marginRight: 10 },
  success: {
    color: colors.success,
  },
  text: {
    color: colors.black,
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
  },
});
export default DataItem;
