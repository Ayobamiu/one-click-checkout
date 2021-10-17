import React from "react";
import { useFormikContext } from "formik";
import AppPicker from "../AppPicker";
import ErrorMessages from "../ErrorMessages";
import AppRadio from "../AppRadio";

function AppFormRadio({
  data,
  name,
  subText,
  displayProperty,
  title,
  id,
  emptyDataMessage,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <>
      <AppRadio
        data={data}
        onPress={(item) => setFieldValue(name, item)}
        subText={subText}
        displayProperty={displayProperty}
        title={title}
        emptyDataMessage={emptyDataMessage}
        defaultValue={values[name]}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormRadio;
