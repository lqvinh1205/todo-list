import { Button, Col, Row, Typography } from "antd";
import React from "react";

const FooterTodo = (props) => {
  return (
    <Row align="middle" justify="center">
      <Col span={5} align="center">
          <Typography.Text>{props.coutActive} items lefts</Typography.Text>
      </Col>
      <Col span={13} align="center">
        <Button size="small" type="text" onClick={props.getAll}>All</Button>
        <Button size="small" type="text" onClick={props.getActive}>Active</Button>
        <Button size="small" type="link" onClick={props.completed}>Completed</Button>
      </Col>
      <Col span={6}>
        <Button size="small" onClick={props.clearCompleted}>Clear Completed</Button>
      </Col>
    </Row>
  );
};

export default FooterTodo;
