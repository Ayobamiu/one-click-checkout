import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import * as Yup from "yup";
import colors from "../config/colors";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";
import AppForm from "../components/Forms/AppForm";
import authApi from "../api/auth";
import ErrorMessages from "../components/ErrorMessages";
import useAuth from "../auth/useAuth";
import showToast from "../config/showToast";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const { logIn } = useAuth();
  const handleSubmit = async ({ email, password }) => {
    setUploadVisible(true);
    const result = await authApi.login(email, password);

    if (result.error) {
      setUploadVisible(false);
      return showToast(result.message);
    }
    setUploadVisible(false);
    logIn(result.data);
  };
  const [hidePassword, setHidePassword] = useState(true);
  const [uploadVisible, setUploadVisible] = useState(false);

  return (
    <Screen loading={uploadVisible}>
      <KeyboardAvoidingView style={styles.container}>
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            keyboardType="email-address"
            placeholder="Email"
            name="email"
            autoCapitalize="none"
          />

          <AppFormField
            onPressShowPassword={() => setHidePassword(!hidePassword)}
            placeholder="Password"
            secureTextEntry={hidePassword}
            showPasswordButton
            showPasswordText={hidePassword ? "Show" : "Hide"}
            name="password"
          />

          <SubmitButton
            title={
              uploadVisible ? (
                <ActivityIndicator animating={true} color={colors.white} />
              ) : (
                "Log In"
              )
            }
            fullWidth
            style={styles.mtAuto}
            disabled={uploadVisible}
          />
        </AppForm>

        <AppButton
          title="Forgot your password?"
          fullWidth
          style={styles.button}
          secondary
        />
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
  error: {
    color: colors.danger,
  },
  mtAuto: {
    marginTop: "auto",
  },
});
export default LoginScreen;
