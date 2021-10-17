import Toast from "react-native-root-toast";
import colors from "./colors";
import { ToastAndroid, Platform } from "react-native";

const showToast = (text) => {
  if (text) {
    // if (Platform.OS === "android") {
    //   ToastAndroid.show(text, ToastAndroid.SHORT);
    // } else {
    Toast.show(text, {
      duration: Toast.durations.LONG,
      backgroundColor: colors.black,
      textColor: colors.white,
    });
    // }
  }
};

export default showToast;
