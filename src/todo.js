import React from "react";
import { Card, CardItem, Body, Text, Right, Icon } from "native-base";
import moment from "moment";

const Todo = ({ todos, deleteTodo }) => {
  const createdOn = moment().subtract(10, "days").calendar().toString();

  return (
    <Card>
      <CardItem button onPress={() => deleteTodo(todos.id)}>
        <Body>
          <Text>
            {todos.todo}
            <Text style={{ color: "#ccc", fontSize: 10 }}>
              {`(${createdOn})`}
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
