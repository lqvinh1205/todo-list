import { Modal, notification } from "antd";
import {
  createActive,
  getActive,
  removeActive,
  updateActive,
} from "./api/actives";
import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import TodoList from "./pages/TodoList";
import "antd/dist/antd.css";

function App() {
  const [actives, setActives] = useState([]);
  const [coutActive, setCoutActive] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const { data } = await getActive();
        const coutActive = (data.filter(item => item.status === 0)).length
        setCoutActive(coutActive)
        setActives(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAll();
    window.alert(`Chào mừng đến với trang web

Lời đầu tiên cho phép em cảm ơn vì đã quan tâm đến sản phẩm này, do vấn đề thời gian có thể còn một vài lỗi nhỏ mong nhận được sự góp ý từ công ty.
Trong website có đầy đủ các chức năng CRUD và confirm khi thực hiện các hành động.
Bài có sử dụng 1 số thư viện như Antd, Axios, React-router-dom
Chú ý: Website có sử dụng mockApi nên tốc độ phản hồi có thể hơi chậm
    `)
  }, []);

  const getCompleted = async () => {
    const { data } = await getActive();
    return setActives(data.filter((item) => item.status !== 0));
  };

  const getActives = async () => {
    const { data } = await getActive();
    return setActives(data.filter((item) => item.status !== 1));
  };

  const getAll = async () => {
    const { data } = await getActive();
    return setActives(data);
  };

  const addActive = (active) => {
    Modal.confirm({
      title: "Ban có chắc muốn thêm ?",
      style: { paddingTop: "15vh" },
      onOk: () => {
        createActive({ ...active, status: 0 }).then((res) => {
          notification.success({
            message: "Thêm thành công !",
          });
          setActives([...actives, res.data]);
        });
      },
    });
  };
  const remove = (id) => {
    Modal.confirm({
      title: "Ban có chắc muốn xóa ?",
      style: { paddingTop: "15vh" },
      onOk: () => {
        removeActive(id).then((res) => {
          notification.success({
            message: "Xóa thành công !",
          });
          setActives(actives.filter(item => item.id !== res.data.id))
        });
      },
    });
  };
  const changeStatus = (active, isChecked) => {
    console.log(active);
    console.log(isChecked.target.checked);
    if (isChecked.target.checked === true) {
      updateActive({ ...active, status: 1 }).then((res) => {
        const data = actives.map((item) =>
          item.id === res.data.id ? res.data : item
        );
        setActives(data);
        notification.success({
          message: "Cập nhật trạng thái: Hoàn thành",
        });
        setCoutActive(coutActive - 1)
      });
    } else {
      updateActive({ ...active, status: 0 }).then((res) => {
        const data = actives.map((item) =>
          item.id === res.data.id ? res.data : item
        );
        setActives(data);
        notification.success({
          message: "Cập nhật trạng thái: Chưa hoàn thành!",
        });
        setCoutActive(coutActive + 1)
      });
    }
  };
  const clearCompleted = async () => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa ?",
      onOk: async () => {
        const { data } = await getActive();
        const listComleted = data.filter((item) => item.status !== 0);
        for (const value of listComleted) {
          removeActive(value.id).then((res) => {
            notification.success({
              message: "Xóa thành công",
            });
            setActives(actives.filter(item => item.id !== res.data.id))
          });
        }
      },
    });
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <TodoList
            add={addActive}
            data={actives}
            update={changeStatus}
            completed={getCompleted}
            getActive={getActives}
            getAll={getAll}
            clearCompleted={clearCompleted}
            coutActive={coutActive}
            remove={remove}
          />
        }
      />
    </Routes>
  );
}

export default App;
