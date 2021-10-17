import React from "react";
import { View, useWindowDimensions } from "react-native";

import RoundedButton from "./RoundedButton";

const OnBoardingFooter = ({
  backgroundColor,
  rightButtonLabel = false,
  rightButtonPress = false,
}) => {
  const windowWidth = useWindowDimensions().width;
  const HEIGHT = windowWidth * 0.21;
  const FOOTER_PADDING = windowWidth * 0.05;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        height: HEIGHT,
        alignItems: "center",
        paddingHorizontal: FOOTER_PADDING,
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      <RoundedButton label={rightButtonLabel} onPress={rightButtonPress} />
    </View>
  );
};

export default OnBoardingFooter;
