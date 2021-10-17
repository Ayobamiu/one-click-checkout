import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "../components/ImageInput";
import * as Yup from "yup";
import AppForm from "../components/Forms/AppForm";
import AppFormField from "../components/Forms/AppFormField";
import SubmitButton from "../components/Forms/SubmitButton";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().label("Email"),
  fullName: Yup.string().label("Name"),
  phone: Yup.string().label("Phone Number"),
  websiteUrl: Yup.string().url().label("Website Url"),
  bio: Yup.string().label("Bio"),
  street: Yup.string().label("Street"),
  city: Yup.string().label("City"),
  state: Yup.string().label("State"),
  zip: Yup.string().label("Zip Code"),
  profilePhoto: Yup.string().label("Profile Photo"),
});

const user = {
  fullName: "Usman",
  email: "ayobamiu@gmail.com",
  phone: "08036137042",
  websiteUrl: "https://monaly.co/ayobamiu",
  bio: "I am a gentle guy",
  street: "6, Gbemisola Street, Opebi",
  city: "Lagos",
  state: "Lagos",
  zip: "100281",
  profilePhoto: "https://picsum.photos/id/1027/200/300",
};

function UpdateProfileScreen(props) {
  const [imageUri, setImageUri] = useState(user.profilePhoto);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppForm
        initialValues={{
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          websiteUrl: user.websiteUrl,
          bio: user.bio,
          street: user.street,
          city: user.city,
          state: user.state,
          zip: user.zip,
          profilePhoto: user.profilePhoto,
        }}
        onSubmit={(values) => {}}
        validationSchema={validationSchema}
      >
        <ImageInput imageUri={imageUri} onChangeImage={setImageUri} rounded />
        <View style={styles.row}>
          <AppText size="header" fontWeight="bold" style={styles.header}>
            Personal Details
          </AppText>

          <SubmitButton title="Update" style={styles.mtAuto} secondary />
        </View>
        <AppFormField placeholder="Name" name="fullName" />

        <AppFormField
          keyboardType="email-address"
          placeholder="Email"
          name="email"
        />
        <AppFormField
          keyboardType="phone-pad"
          placeholder="Phone"
          name="phone"
        />
        <AppFormField
          keyboardType="url"
          placeholder="Website Url"
          name="websiteUrl"
        />
        <AppFormField placeholder="Bio" name="bio" />
        <AppText size="header" fontWeight="bold" style={styles.header}>
          Address
        </AppText>
        <AppFormField placeholder="Street" name="street" />
        <AppFormField placeholder="City" name="city" />
        <AppFormField placeholder="State" name="state" />
        <AppFormField placeholder="Zip Code" name="zip" />
        <SubmitButton title="Update" style={styles.mtAuto} fullWidth />
        <AppButton
          title="Cancel"
          secondary
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      </AppForm>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  header: { marginVertical: 10, alignSelf: "flex-start" },
  justifyLeft: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  primary: {
    color: colors.primary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});
export default UpdateProfileScreen;
