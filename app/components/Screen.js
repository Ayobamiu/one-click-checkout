import React from "react";
import Constant from "expo-constants";
import { StyleSheet, View, StatusBar } from "react-native";

function Screen({ children, style, loading = false }) {
  return (
    <View style={[styles.screen, style]}>
      <StatusBar
        networkActivityIndicatorVisible={loading}
        translucent
        backgroundColor="transparent"
      />
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    // paddingTop: Constant.statusBarHeight,
    flex: 1,
  },
});

export default Screen;
