import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
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
  Fab,
  Icon,
} from "native-base";
import moment from "moment";

import Todo from "./todo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [getTodos, setGetTodos] = useState(true);
  const [text, setText] = useState("");

  // CARGAR DATOS DE INICIO

  useEffect(() => {
    const getData = async () => {
      try {
        const todosStorage = await AsyncStorage.getItem("savedTodos");
        if (todosStorage) {
          setTodos(JSON.parse(todosStorage));

          setGetTodos(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (getTodos) {
      getData();
    }
  }, [getTodos]);

  // AGREGAR UN TODO

  const addTodo = (text) => {
    let createdOn = moment().format("DD/MM/YY, h:mm:ss a");

    if (text == "") {
      noTextAlert();
      return;
    } else {
      const newTodo = {};
      newTodo.id = Math.random().toString();
      newTodo.text = text;
      newTodo.createdOn = createdOn;
      const todosNuevo = [...todos, newTodo];
      setTodos(todosNuevo);
      setText("");
      storeData(JSON.stringify(todosNuevo));
      setGetTodos(true);
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
    Alert.alert("Ops!", "Por favor agregá algun texto a la Tarea", [
      {
        text: "Ok",
        onPress: () => {},
      },
    ]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Header>
          <Left style={{ flex: 1 }}></Left>
          <Body style={{ flex: 1 }}>
            <Title style={{ alignSelf: "center", fontSize: 20 }}>
              Todo App
            </Title>
          </Body>
          <Right style={{ flex: 1 }}></Right>
        </Header>

        <Fab
          containerStyle={{}}
          style={{
            backgroundColor: "#5067FF",
          }}
          position="bottomRight"
          onPress={() => addTodo(text)}
        >
          <Icon name="add" />
        </Fab>

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
    </TouchableWithoutFeedback>
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
