import React from "react";
import { Card, CardItem, Body, Text, Right, Icon } from "native-base";

const Todo = ({ todos, deleteTodo }) => {
  return (
    <Card>
      <CardItem button onPress={() => deleteTodo(todos.id)}>
        <Body>
          <Text style={{ width: 300 }}>
            {todos.todo}
            <Text style={{ color: "#ccc", fontSize: 10 }}>
              {` - (${todos.createdOn})`}
            </Text>
          </Text>
        </Body>
        <Right>
          <Icon name="close" />
        </Right>
      </CardItem>
    </Card>
  );
};

export default Todo;
