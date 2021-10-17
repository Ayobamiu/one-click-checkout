import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

function SubmitButton({ title, style, ...otherProps }) {
  const { handleSubmit } = useFormikContext();
  return (
    <>
      <AppButton
        title={title}
        onPress={handleSubmit}
        style={style}
        {...otherProps}
      />
    </>
  );
}

export default SubmitButton;
