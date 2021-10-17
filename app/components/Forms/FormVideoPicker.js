import React from "react";
import ImageInputList from "../ImageInputList";
// import ErrorMessages from "./ErrorMessages";
import { useFormikContext } from "formik";
import ErrorMessages from "../ErrorMessages";
import VideoInput from "../VideoInput";

function FormVideoPicker({ name, style }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const videoUri = values[name];
  return (
    <>
      <VideoInput
        videoUri={videoUri}
        onChangeVideo={(uri) => setFieldValue(name, uri)}
        style={style}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}
export default FormVideoPicker;
