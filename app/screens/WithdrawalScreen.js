import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
import * as Yup from "yup";
import AppForm from "../components/Forms/AppForm";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";
import AppFormRadio from "../components/Forms/AppFormRadio";
import useBanks from "../hooks/useBanks";
import WithdrawalAPIs from "../api/withdraw";
import UploadScreen from "../components/UploadScreen";
import AppModalFullPage from "../components/AppModalFullPage";
import AppButton from "../components/AppButton";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

const validationSchema = Yup.object().shape({
  bank: Yup.object().required().nullable().label("Bank Record"),
  amount: Yup.number().required().min(100).label("Amount to withdraw"),
});

function WithdrawalScreen(props) {
  const { loading, getBankRecords, bankRecords } = useBanks();
  const [refreshing, setRefreshing] = React.useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    (async () => {
      await getBankRecords();
    })();
  }, []);
  useEffect(() => {
    getBankRecords();
    setUploadVisible(false);
  }, []);
  const handleSubmit = async (data) => {
    setProgress(0);
    setUploadVisible(true);
    setPaying(true);
    const result = await WithdrawalAPIs.withdraw({ ...data }, (progress) =>
      setProgress(progress)
    );

    setPaying(false);
    if (result.error) {
      setError(true);
      return alert("Could not save product");
    } else {
      setPaid(true);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <AppModalFullPage
        isVisble={uploadVisible}
        toggleModal={() => setUploadVisible(!uploadVisible)}
      >
        {paying && (
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              padding: 58,
            }}
          >
            <ActivityIndicator animating={paying} />
          </View>
        )}
        {!paying && paid && (
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              padding: 58,
            }}
          >
            <FontAwesome
              name="check-circle"
              size={100}
              color={colors.success}
            />
            <AppText
              size="medium"
              style={{
                textAlign: "center",
              }}
            >
              Successfully withdrawn to your Account.
            </AppText>
            <AppText
              style={{
                color: colors.light,
                textAlign: "center",
                paddingVertical: 16,
              }}
            >
              Money has been successfully withdrawn to your Account.
            </AppText>
            <AppButton
              title="Done"
              fullWidth
              style={styles.bottom}
              onPress={() => {
                setUploadVisible(false);
                setPaid(false);
              }}
              // disabled
            />
          </View>
        )}
        {!paying && error && (
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              padding: 58,
            }}
          >
            <MaterialIcons
              name="error-outline"
              size={100}
              color={colors.danger}
            />
            <AppText
              size="medium"
              style={{
                textAlign: "center",
              }}
            >
              Withdrawal to your Account was not successful.
            </AppText>
            <AppText
              style={{
                color: colors.light,
                textAlign: "center",
                paddingVertical: 16,
              }}
            >
              Withdrawal to your Account was not successful. Please, try again.
              If problem persist, please reach out to us.
            </AppText>
            <AppButton
              title="Okay"
              fullWidth
              style={styles.bottom}
              onPress={() => {
                setUploadVisible(false);
                setError(false);
              }}
              // disabled
            />
          </View>
        )}
      </AppModalFullPage>

      {/* <UploadScreen
        onDone={() => {
          setUploadVisible(false);
          props.navigation.navigate("Balance");
        }}
        progress={progress}
        visible={uploadVisible}
      /> */}
      <KeyboardAvoidingView style={styles.container}>
        <AppForm
          initialValues={{ bank: null, amount: "" }}
          onSubmit={(values) => {
            handleSubmit({
              amount: values.amount,
              account_bank: values.bank.bank.Code,
              account_number: values.bank.accountNumber,
            });
          }}
          validationSchema={validationSchema}
        >
          <ActivityIndicator animating={loading} color={colors.primary} />
          <AppFormRadio
            name="bank"
            data={bankRecords}
            subText="accountNumber"
            displayProperty="bankName"
            title="Select a bank"
            id="Id"
            emptyDataMessage="No bank records found, Add a new a bank to continue"
          />

          <AppText size="input" style={[styles.black]}>
            Enter Amount to Withdraw
          </AppText>
          <AppFormField
            keyboardType="number-pad"
            placeholder="Enter Amount"
            name="amount"
          />
          <AppText
            size="input"
            style={[styles.black, styles.mt30, styles.cneter]}
          >
            Every withdrawal transaction will include 1.7% proccessing fee.
          </AppText>
          <SubmitButton title="Withdraw" fullWidth style={styles.mtAuto} />
        </AppForm>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  black: { color: colors.medium },
  bottom: { position: "absolute", bottom: 16, width: "100%" },
  cneter: { textAlign: "center" },
  container: {
    flex: 1,
    padding: 16,
  },
  mt30: {
    marginTop: 30,
  },
  mtAuto: {
    marginTop: "auto",
  },
  primary: {
    color: colors.primary,
  },
});
export default WithdrawalScreen;
