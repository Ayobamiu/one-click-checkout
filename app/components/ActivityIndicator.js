import React from "react";
import LottieView from "lottie-react-native";
import {
  View,
  ActivityIndicator as NativeActivityIndicator,
  Text,
  useWindowDimensions,
} from "react-native";
import colors from "../config/colors";

function ActivityIndicator({ visible = false }) {
  const { height, width } = useWindowDimensions();
  if (!visible) return null;
  return (
    // <LottieView
    //   autoPlay
    //   loop
    //   source={require("../assets/animations/lf30_editor_l8png6na.json")}
    //   style={{
    //     flex: 1,
    //     backgroundColor: "#ffffff",
    //     position: "absolute",
    //     zIndex: 2,
    //     elevation: 2,
    //   }}
    // />
    <View
      style={{
        backgroundColor: colors.opaqueBalck,
        position: "absolute",
        zIndex: 5,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center",
        height,
        width,
      }}
    >
      <NativeActivityIndicator
        animating={visible}
        color={colors.primary}
        size="large"
      />
    </View>
  );
}

export default ActivityIndicator;
