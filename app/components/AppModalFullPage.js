import React from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";

const AppModalFullPage = ({ toggleModal, isVisble = true, children }) => {
  return (
    <Modal
      animationType="slide"
      visible={isVisble}
      onRequestClose={() => {
        toggleModal(!isVisble);
      }}
      statusBarTranslucent
    >
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AppModalFullPage;
