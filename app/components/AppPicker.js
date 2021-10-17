import React, { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import AppText from "./AppText";
import PickerItem from "./PickerItem";
import colors from "../config/colors";

function AppPicker({
  icon,
  placeholder,
  items,
  selectedItem,
  onSelectItem,
  id,
  justTextStyle,
  justText = false,
  rounded = false,
  columns = false,
  displayProperty,
  ...otherProps
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const IconPlusText = ({ item, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
        <View style={styles.selectIcon}>
          {item.icon && (
            <MaterialCommunityIcons
              name={item.icon}
              size={32}
              color={colors.white}
            />
          )}
        </View>
        <AppText
          style={styles.iconText}
          size="x-small"
          fontWeight="medium"
          numberOfLines={1}
        >
          {item[displayProperty]}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {!justTextStyle ? (
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View
            style={[styles.container, rounded ? styles.rounded : styles.box]}
          >
            {icon && (
              <MaterialCommunityIcons
                name={icon}
                size={20}
                color={colors.medium}
                style={styles.icon}
              />
            )}
            {selectedItem ? (
              <AppText style={styles.text} size="medium">
                {selectedItem[displayProperty]}
              </AppText>
            ) : (
              <AppText style={styles.placeholder} size="medium">
                {placeholder}
              </AppText>
            )}
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color={colors.medium}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          {selectedItem ? (
            <AppText style={[justTextStyle]} size="medium">
              {selectedItem[displayProperty]}
            </AppText>
          ) : (
            <AppText style={[justTextStyle]} size="medium">
              {placeholder}
            </AppText>
          )}
        </Pressable>
      )}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.closeButton}>
          <FontAwesome5
            name="times"
            size={20}
            color={colors.gray3}
            onPress={() => setModalVisible(false)}
          />
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item[id]}
          numColumns={columns && 3}
          horizontal={false}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({ item }) => {
            return columns ? (
              <IconPlusText
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            ) : (
              <PickerItem
                label={item[displayProperty]}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            );
          }}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  box: { borderRadius: 8 },
  closeButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  container: {
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.gray,
  },
  icon: {
    marginRight: 10,
  },
  iconContainer: {
    flex: 0.33,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  iconText: { textAlign: "center", color: colors.medium },
  placeholder: { color: colors.black, flex: 1 },
  selectIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
  },
  rounded: { borderRadius: 100 },
  text: { flex: 1, color: colors.medium },
  contentContainerStyle: { marginVertical: 10 },
});
export default AppPicker;
