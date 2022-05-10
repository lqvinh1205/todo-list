import { Button, Checkbox, Col, List, Modal, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import FooterTodo from "../components/FooterTodo";
import HeaderTodo from "../components/HeaderTodo";
import "./TodoList.css";

const TodoList = (props) => {
  return (
    <>
      <Modal
        title="Todo List"
        visible={true}
        closable={false}
        cancelText={false}
        footer={
          <FooterTodo
            completed={props.completed}
            getAll={props.getAll}
            getActive={props.getActive}
            clearCompleted={props.clearCompleted}
            coutActive={props.coutActive}
          />
        }
      >
        <List
          header={<HeaderTodo add={props.add} />}
          size="large"
          dataSource={props.data}
          renderItem={(item) => (
            <Row align="middle">
              <Col span={22}>
                <Checkbox
                  autoFocus={true}
                  onChange={(isChecked) => props.update(item, isChecked)}
                  checked={item.status === 1 && true}
                >
                  <List.Item className="listItem">{item.name} </List.Item>
                </Checkbox>
              </Col>
              <Button size="small" onClick={() => props.remove(item.id)}><DeleteOutlined style={{ fontSize: '150%'}}/></Button>
            </Row>
          )}
        />
      </Modal>
    </>
  );
};

export default TodoList;
