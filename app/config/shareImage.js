import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
const shareImage = async (view) => {
  const result = await captureRef(view, {
    result: "tmpfile",
    height: 1200,
    width: 627,
    quality: 1,
    format: "png",
  });
  if (!(await Sharing.isAvailableAsync())) {
    alert(`Uh oh, sharing isn't available on your platform`);
    return;
  }

  await Sharing.shareAsync(result);
};

export default shareImage;
