import React from "react";
import colors from "../config/colors";
import AppText from "./AppText";

function RightHeader({ text, onPress }) {
  return (
    <AppText size="medium" style={{ color: colors.primary }} onPress={onPress}>
      {text}
    </AppText>
  );
}

export default RightHeader;
