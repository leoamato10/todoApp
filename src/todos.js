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
import moment from "moment";

import Todo from "./todo";

const Todos = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  // CARGAR DATOS DE INICIO

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

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  // AGREGAR UN TODO

  const addTodo = (text) => {
    let createdOn = moment().format("DD/MM/YY, h:mm:ss a");

    if (text == "") {
      noTextAlert();
      return;
    } else {
      setTodos((prevTodos) => [
        ...prevTodos,
        { todo: text, id: Math.random().toString(), createdOn },
      ]);
      setText("");
      storeData(JSON.stringify(todos));
    }
  };

  // ELIMINAR UN TODO

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id != id);
    setTodos(filteredTodos);
    storeData(JSON.stringify(filteredTodos));
  };

  // PERSISTIR DATOS EN STORAGE

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("savedTodos", value);
    } catch (e) {
      console.log(e);
    }
  };

  const noTextAlert = () =>
    Alert.alert("Ops!", "Por favor agregá algun texto", [
      {
        text: "Ok",
        onPress: () => console.log("Cancel Pressed"),
      },
    ]);

  return (
    <View style={styles.container}>
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
                onChangeText={(val) => setText(val)}
                value={text}
              />
            </View>
            <View>
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
  container: {
    flex: 1,
    backgroundColor: "#eeff",
  },
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
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginRight: 15,
  },
});

export default Todos;
