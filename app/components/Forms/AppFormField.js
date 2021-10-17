import React from "react";
import { useFormikContext } from "formik";
import AppTextInput from "../AppTextInput";
import ErrorMessages from "../ErrorMessages";

function AppFormField({
  name,
  onChangeText = () => {},
  defaultValue,
  ...otherProps
}) {
  const {
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
    setFieldValue,
  } = useFormikContext();
  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => {
          setFieldValue(name, text);
          onChangeText(text);
        }}
        {...otherProps}
        defaultValue={values[name] || defaultValue}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
