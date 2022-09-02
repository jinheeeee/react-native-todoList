import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback, // 유저에게 눌려졌다는 정보만 알려줌
  Pressable,
  TextInput, // 누르는 시간에 따라 정의가능
} from "react-native";
import { theme } from "./colors";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const work = () => setWorking(true);
  const travel = () => setWorking(false);
  const onChangeText = (payload) => setText(payload);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        {/* activeOpacity 투명도 조절 */}
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? "white" : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onChangeText={onChangeText}
          returnKeyType="send"
          placeholder={working ? "Add a To Do" : "Where do you want to go?"}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    marginTop: 20,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 18,
  },
});
