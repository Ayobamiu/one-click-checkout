import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function AppRadio({
  title,
  onPress,
  data,
  displayProperty,
  subText,
  emptyDataMessage,
  defaultValue,
}) {
  const [selectedIndex, setSelectedIndex] = useState(defaultValue);
  return (
    <View style={styles.container}>
      <AppText style={[styles.title, styles.mb10]} size="input">
        {title}
      </AppText>
      <ScrollView style={[styles.box, styles.borderBottom]}>
        {data.map((item, index) => (
          <Pressable
            onPress={() => {
              setSelectedIndex(item);
              onPress(item);
            }}
            style={[styles.row]}
            key={index}
          >
            <View>
              <AppText style={styles.title} size="medium" fontWeight="medium">
                {item[displayProperty]}
              </AppText>
              {subText && (
                <AppText
                  style={styles.smallText}
                  size="medium"
                  fontWeight="medium"
                >
                  {item[subText]}
                </AppText>
              )}
            </View>
            <View style={[styles.checkBox]}>
              <View
                style={[
                  styles.checkBoxIn,
                  item === selectedIndex ? styles.checked : styles.unchecked,
                ]}
              ></View>
            </View>
          </Pressable>
        ))}
        {data && data.length === 0 && (
          <AppText
            size="medium"
            fontWeight="bold"
            style={[styles.textCenter, styles.mv20]}
          >
            {emptyDataMessage || "No Data here"}
          </AppText>
        )}
        {data && data.length > 0 && <View style={styles.mb20} />}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  borderBottom: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  box: { maxHeight: 100, paddingRight: 10 },
  checkBox: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderColor: colors.gray3,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkBoxIn: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  checked: {
    backgroundColor: colors.gray3,
  },
  container: {
    width: "100%",
    marginVertical: 10,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  mv20: {
    marginVertical: 20,
  },
  primary: {
    marginBottom: 20,
  },
  textCenter: {
    textAlign: "center",
  },
  title: {
    color: colors.black,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  smallText: {
    color: colors.medium,
    fontSize: 14,
  },
  unchecked: {
    backgroundColor: "transparent",
  },
});

export default AppRadio;
