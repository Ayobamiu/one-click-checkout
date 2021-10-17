import React from "react";
import ImageInputList from "../ImageInputList";
// import ErrorMessages from "./ErrorMessages";
import { useFormikContext } from "formik";
import ErrorMessages from "../ErrorMessages";
import ImageInput from "../ImageInput";

function FormSingleImagePicker({ name, rounded }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUri = values[name];
  const handleAdd = (uri) => {
    setFieldValue(name, uri);
  };

  return (
    <>
      <ImageInput
        imageUri={imageUri}
        onChangeImage={handleAdd}
        rounded={rounded}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}
export default FormSingleImagePicker;
