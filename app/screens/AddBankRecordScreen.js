import React, { useCallback, useState } from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import * as Yup from "yup";
import colors from "../config/colors";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";
import AppForm from "../components/Forms/AppForm";
import AppFormPicker from "../components/Forms/AppFormPicker";
import useBanks from "../hooks/useBanks";
import ActivityIndicator from "../components/ActivityIndicator";
import showToast from "../config/showToast";
import AppPicker from "../components/AppPicker";
import AppTextInput from "../components/AppTextInput";
import UploadScreen from "../components/UploadScreen";

const validationSchema = Yup.object().shape({
  bank: Yup.object().required().label("Bank"),
  accountNumber: Yup.string().min(10).max(10).label("Account Number"),
  accountName: Yup.string().nullable().label("Account Name"),
});

function AddBankRecordScreen(props) {
  const {
    banks,
    confirmBank,
    name,
    loading,
    message,
    addBankRecord,
  } = useBanks();
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useCallback(() => {
    showToast(message);
  }, [message])();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ActivityIndicator visible={loading} />
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppPicker
        items={banks.sort(function (a, b) {
          var textA = a.Name.toUpperCase();
          var textB = b.Name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        })}
        placeholder="Select Bank"
        name="bank"
        displayProperty="Name"
        id="Code"
        onSelectItem={(item) => {
          setSelectedBank(item);
        }}
        selectedItem={selectedBank}
      />
      <AppTextInput
        placeholder="Account Number"
        keyboardType="phone-pad"
        onChangeText={(text) => {
          setAccountNumber(text);
          if (text.length === 10) {
            confirmBank(text, selectedBank && selectedBank.Code);
          }
        }}
      />
      <AppTextInput placeholder="Account Name" defaultValue={name} />

      <AppButton
        title="Add Bank Record"
        fullWidth
        style={styles.mtAuto}
        onPress={async () => {
          setProgress(0);
          setUploadVisible(true);
          try {
            await addBankRecord(
              {
                bank: selectedBank,
                accountNumber,
                accountName: name,
                bankName: selectedBank.Name,
              },
              (progress) => setProgress(progress)
            );
            props.navigation.navigate("Withdraw");
          } catch (error) {
            if (error) {
              setUploadVisible(false);
              return alert("Could not save product");
            }
          }
        }}
      />
    </KeyboardAvoidingView>
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
export default AddBankRecordScreen;
