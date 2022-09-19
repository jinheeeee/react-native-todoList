import React, { Component, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { theme } from "../colors";

import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const TodoListItem = ({ id, text, completed, toDos, setToDos, deleteTodo }) => {
  const [editTitle, setEditTitle] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  //수정 버튼
  const editBtnClick = (id) => {
    setIsEdit(true);

    Object.keys(toDos).map((key) => {
      if (key === id) {
        setEditTitle(toDos[key].text);
      }

      return toDos[key];
    });
  };

  // 수정 저장 버튼
  const editHandler = (id) => {
    let newTodo = Object.keys(toDos).map((key) => {
      if (key === id) {
        toDos[id].text = editTitle;
      }
      return toDos[key];
    });
    setToDos(newTodo);

    setIsEdit(false);
  };

  // 수정 input change
  const onChangeText = (payload) => setEditTitle(payload);

  // 완료된 일은 체크
  const completeClick = (id) => {
    let newTodo = Object.keys(toDos).map((key) => {
      if (key === id) {
        toDos[id].completed = !toDos[id].completed;
      }
      return toDos[key];
    });
    setToDos(newTodo);
  };

  return (
    <View>
      {isEdit ? (
        <View style={{ ...styles.toDo, flexDirection: "row" }}>
          <TextInput
            onChangeText={onChangeText}
            style={{ backgroundColor: "white", flex: 1 }}
            value={editTitle}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => editHandler(id)}
              style={{ paddingHorizontal: 10 }}
            >
              <Text>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsEdit(false)}>
              <Fontisto name="close" size={18} color={theme.toDoBg} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ ...styles.toDo, flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            {completed ? (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => completeClick(id)}
              >
                <Fontisto name="checkbox-active" size={18} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => completeClick(id)}
              >
                <Fontisto name="checkbox-passive" size={18} color="white" />
              </TouchableOpacity>
            )}

            <Text
              style={{
                ...styles.todoText,
                textDecorationLine: completed ? "line-through" : "unset",
                color: completed ? theme.toDoBg : "white",
              }}
            >
              {text}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => editBtnClick(id)}>
              <Entypo
                style={{ marginRight: 10 }}
                name="edit"
                size={18}
                color={theme.toDoBg}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(id)}>
              <Fontisto name="trash" size={18} color={theme.toDoBg} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default TodoListItem;
