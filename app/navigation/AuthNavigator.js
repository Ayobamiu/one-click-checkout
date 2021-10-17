import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RightHeader from "../components/RightHeader";
import OnboardingScreen from "../screens/OnboardingScreen";
const Stack = createNativeStackNavigator();

function AuthNavigator(props) {
  return (
    <Stack.Navigator initialRouteName="Onboard">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <RightHeader
              onPress={() => {
                navigation.navigate("Sign Up");
              }}
              text="Sign Up"
            />
          ),
        })}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <RightHeader
              onPress={() => {
                navigation.navigate("Login");
              }}
              text="Login"
            />
          ),
        })}
      />
      <Stack.Screen
        name="Onboard"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
