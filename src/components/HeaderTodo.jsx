import { Form, Input } from "antd";
import React from "react";

const HeaderTodo = (props) => {
  return (
    <Form onFinish={props.add}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your name actives!" }]}
      >
        <Input size="large" placeholder="What needs to be done ?" />
      </Form.Item>
    </Form>
  );
};

export default HeaderTodo;
