import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import AppButton from "../components/AppButton";
import AppCheckBox from "../components/AppCheckBox";
import AppForm from "../components/Forms/AppForm";
import AppFormField from "../components/Forms/AppFormField";
import Screen from "../components/Screen";
import * as Yup from "yup";
import SubmitButton from "../components/Forms/SubmitButton";
import colors from "../config/colors";
import authApi from "../api/auth";
import AppText from "../components/AppText";
import showToast from "../config/showToast";
import useAuth from "../auth/useAuth";
// import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  userName: Yup.string().required().label("User Name"),
  iAccept: Yup.boolean().required().label("iAccept"),
});

function SignUpScreen(props) {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [uploadVisible, setUploadVisible] = useState(false);

  const { logIn } = useAuth();

  return (
    <Screen loading={uploadVisible}>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <AppForm
          initialValues={{
            email: "",
            firstName: "",
            password: "",
            iAccept: true,
          }}
          onSubmit={(values) => {
            (async () => {
              setUploadVisible(true);
              const result = await authApi.signUp(values);
              if (result.error) {
                setUploadVisible(false);
                return showToast(result.message);
              }
              setUploadVisible(false);
              logIn(result.data);
            })();
          }}
          validationSchema={validationSchema}
        >
          <AppFormField placeholder="First Name" name="firstName" />
          <AppFormField placeholder="Last Name" name="lastName" />
          <AppFormField
            placeholder="Choose a userName"
            name="userName"
            onChangeText={(text) => {
              (async () => {
                const result = await authApi.checkAvailableUserName(text);
                if (result.error) {
                  setMessage(result.message);
                  return setColor("red");
                }
                setMessage(result.data.message);
                setColor("green");
              })();
            }}
          />
          {message ? (
            <AppText style={{ color: color ? color : "white" }} size="x-small">
              {message}
            </AppText>
          ) : null}
          <AppFormField
            keyboardType="email-address"
            placeholder="Email"
            name="email"
          />

          <AppFormField
            onPressShowPassword={() => setHidePassword(!hidePassword)}
            placeholder="Password"
            secureTextEntry={hidePassword}
            showPasswordButton
            showPasswordText={hidePassword ? "Show" : "Hide"}
            name="password"
          />
          <AppCheckBox
            onPress={(checked) => {}}
            title="I would like to receive your newsletter and other promotional information."
            defaultChecked={true}
          />

          <SubmitButton
            title={
              uploadVisible ? (
                <ActivityIndicator
                  animating={true}
                  color={colors.white}
                  size="large"
                />
              ) : (
                "Sign Up"
              )
            }
            fullWidth
            style={styles.mtAuto}
            disabled={uploadVisible}
          />
        </AppForm>
      </KeyboardAvoidingView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  button: {
    marginVertical: 4,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  mtAuto: {
    marginTop: "auto",
  },
});
export default SignUpScreen;
