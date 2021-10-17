import React, { useState, useRef } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import timeSince from "../utility/timeSince";

function HelpScreen(props) {
  const messagesList = useRef();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      _id: "1",
      text: "Hi",
      from: "me",
      time: `${Date.now()}`,
    },
    {
      _id: "2",
      text: "Hi customer.",
      from: "monaly",
      time: `${Date.now()}`,
    },
  ]);
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        onContentSizeChange={() => messagesList.current.scrollToEnd()}
        ref={messagesList}
        renderItem={({ item }) => (
          <View>
            <AppText
              size="medium"
              style={[
                styles.textBox,
                item.from === "me" ? styles.sender : styles.monaly,
                item.from === "me" ? styles.start : styles.end,
              ]}
            >
              {item.text}
            </AppText>
            <AppText
              style={[
                styles.black,
                item.from === "me" ? styles.start : styles.end,
              ]}
            >
              {timeSince(item.time)} ago
            </AppText>
          </View>
        )}
        ListHeaderComponent={() => (
          <AppText size="medium" style={styles.mv10}>
            Our team members are online 24/7. Send us a message, we are here to
            help.
          </AppText>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item._id}
      />

      <View style={styles.mtAuto}>
        <View style={{ flex: 1 }}>
          <AppTextInput
            placeholder="Message"
            onChangeText={(text) => {
              setMessage(text);
            }}
            defaultValue={message}
          />
        </View>
        <AppButton
          title={
            <MaterialCommunityIcons
              name="send-circle-outline"
              size={34}
              color="black"
            />
          }
          secondary
          small
          style={{ flex: 0.1 }}
          onPress={() => {
            if (message) {
              setMessages([
                ...messages,
                {
                  _id: `${new Date().toString()}`,
                  from: "me",
                  text: message,
                  time: `${Date.now()}`,
                },
              ]);
            }
            setMessage("");
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  black: { color: colors.black },
  container: {
    padding: 8,
    flex: 1,
  },
  mtAuto: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mv10: {
    marginVertical: 10,
  },
  textBox: {
    borderRadius: 32,
    maxWidth: "70%",
    minWidth: 80,
    color: colors.white,
    padding: 16,
  },

  separator: {
    marginVertical: 4,
  },

  start: { alignSelf: "flex-start" },
  end: {
    textAlign: "right",
    alignSelf: "flex-end",
  },
  sender: { backgroundColor: colors.medium },
  monaly: {
    backgroundColor: colors.success,
  },
});
export default HelpScreen;
