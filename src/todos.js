import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Header,
  Button,
  Text,
  Form,
  Input,
  Left,
  Body,
  Right,
  Title,
} from "native-base";

import Todo from "./todo";

const Todos = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const todosStorage = await AsyncStorage.getItem("savedTodos");
        if (todosStorage) {
          setTodos(JSON.parse(todosStorage));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("savedTodos", value);
    } catch (e) {
      console.log(e);
    }
  };

  const addTodo = (text) => {
    if (text == "") {
      noTextAlert();
    } else {
      setTodos((prevTodos) => [
        { todo: text, id: Math.random().toString() },
        ...prevTodos,
      ]);
      storeData(JSON.stringify(todos));
    }
  };

  const noTextAlert = () =>
    Alert.alert("Error", "Por favor agregá algun texto", [
      {
        text: "Ok",
        onPress: () => console.log("Cancel Pressed"),
      },
    ]);

  const deleteTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id != id);
    });
  };

  // console.log(todos);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Left />
        <Body>
          <Title>Todo App</Title>
        </Body>
        <Right />
      </Header>
      <View>
        <View style={styles.content}>
          <Form style={styles.form}>
            <View style={styles.formInside}>
              <Input
                placeholder="Add Todo"
                onChangeText={(val) => {
                  setText(val);
                }}
              />
            </View>
            <View style={{ width: "30%" }}>
              <Button onPress={() => addTodo(text)}>
                <Text>Add Todo</Text>
              </Button>
            </View>
          </Form>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <FlatList
            style={{ marginBottom: 206 }}
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Todo todos={item} deleteTodo={deleteTodo} />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 15,
    width: "100%",
  },
  form: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  formInside: {
    width: "70%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginRight: 15,
  },
});

export default Todos;
