import React from "react";
import { useFormikContext } from "formik";
import AppPicker from "../AppPicker";
import ErrorMessages from "../ErrorMessages";

function AppFormPicker({
  items,
  name,
  placeholder,
  icon,
  id,
  justTextStyle,
  justText,
  rounded,
  displayProperty,
  columns,
  valueProperty,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <>
      <AppPicker
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
        icon={icon}
        id={id}
        justTextStyle={justTextStyle}
        justText={justText}
        rounded={rounded}
        columns={columns}
        displayProperty={displayProperty}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
