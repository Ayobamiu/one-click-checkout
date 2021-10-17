import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import colors from "../config/colors";

function WelcomeScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/monalydashboardlogo.png")}
          style={styles.image}
        />
        <AppText size="medium" fontWeight="bold">
          Start Selling Online
        </AppText>
      </View>
      <AppButton
        title="Login"
        fullWidth
        style={styles.button}
        onPress={() => {
          props.navigation.navigate("Login");
        }}
      />
      <AppButton
        title="Register"
        fullWidth
        style={styles.button}
        onPress={() => {
          props.navigation.navigate("Sign Up");
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
  },
  image: {
    marginVertical: 10,
  },
  imageContainer: {
    position: "absolute",
    top: 170,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default WelcomeScreen;
