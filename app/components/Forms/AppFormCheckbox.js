import React from "react";
import { useFormikContext } from "formik";
import AppTextInput from "../AppTextInput";
import ErrorMessages from "../ErrorMessages";
import AppCheckBox from "../AppCheckBox";

function AppFormCheckbox({ name, title, ...otherProps }) {
  const {
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
  } = useFormikContext();
  return (
    <>
      <AppCheckBox
        onPress={handleChange(name)}
        {...otherProps}
        defaultChecked={values[name]}
        title={title}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormCheckbox;
