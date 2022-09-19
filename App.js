import React from "react";
import { StatusBar } from "expo-status-bar"; //
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback, // 유저에게 눌려졌다는 정보만 알려줌
  Pressable,
  TextInput, // 누르는 시간에 따라 정의가능
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "./colors";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 내 폰에 저장
const STORAGE_KEY = "@toDos";
const STORAGE_STATUS_KEY = "@status";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import List from "./components/list";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  // const [completed, setCompleted] = useState(false);
  const [toDos, setToDos] = useState({});
  // 수정
  // const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  useEffect(() => {
    loadToDos();
  }, []);
  // 어느 탭을 보고 있엇는지 storage에 저장!
  useEffect(() => {
    loadStatus();
  }, [working]);

  useEffect(() => {
    onChangeText(text);
  }, [text]);

  const work = async () => {
    setWorking(true);
    await AsyncStorage.setItem(STORAGE_STATUS_KEY, "true");
  };

  const travel = async () => {
    setWorking(false);
    await AsyncStorage.setItem(STORAGE_STATUS_KEY, "false");
  };

  const loadStatus = async () => {
    const s = await AsyncStorage.getItem(STORAGE_STATUS_KEY);
    setWorking(JSON.parse(s));
  };

  const onChangeText = (payload) => setText(payload);

  const addTodo = async () => {
    if (text === "") {
      return;
    }

    // * 이전 todo와 새로운 todo 합치는 방법 (es6문법)
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working, completed: false, isEditing: false },
    };

    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  };

  const deleteTodo = (key) => {
    Alert.alert("Delete To Do?", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm sure",
        style: "destructive", // IOS에서만 가능. 버튼컬러 다름
        onPress: () => {
          // 전에 들어있던 todo데이터를 새 오브젝트에 만들어서 넣음
          // state를 mutate하면 안되기 때문에 새로운 object를 만들어 주는거임
          const newTodos = { ...toDos };
          delete newTodos[key];
          setToDos(newTodos);
          saveToDos(newTodos);
        },
      },
    ]);
  };

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
          onSubmitEditing={addTodo}
          onChangeText={onChangeText}
          returnKeyType="done"
          placeholder={working ? "Add a To Do" : "Where do you want to go?"}
          style={styles.input}
          value={text}
        />
      </View>
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          //눌렀을 때의 working값과 toDos의 working이 동일할 때만 보여줘!
          toDos[key].working === working ? (
            <List
              key={key}
              id={key}
              text={toDos[key].text}
              completed={toDos[key].completed}
              isEditing={toDos[key].isEditing}
              deleteTodo={deleteTodo}
              toDos={toDos}
              setToDos={setToDos}
            />
          ) : null,
        )}
      </ScrollView>
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
    marginVertical: 20,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
