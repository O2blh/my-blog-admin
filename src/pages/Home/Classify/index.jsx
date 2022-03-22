import React, { useRef } from "react";
import { Button, List, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./style.css";

const data = [
  {
    _id: 1,
    classify: "JavaScipt 手撕代码",
    count: 10,
  },
  {
    _id: 2,
    classify: "前端基础",
    count: 10,
  },
  {
    _id: 3,
    classify: "JavaScript 数据结构与算法",
    count: 10,
  },
  {
    _id: 4,
    classify: "CSS 常见问题",
    count: 10,
  },
];

const Classify = () => {
  const openEditModal = (id, classify) => {};

  const deleteClass = (id, classify) => {};

  const inputRef = useRef();
  return (
    <div className="classifyBox">
      <div className="classifyTitle">分类</div>
      <div className="classifyCreateBox">
        <input
          className="classCreateInput"
          type="text"
          ref={inputRef}
          placeholder="请输入新的分类..."
        />
        <Button className="classCreateBtn" type="primary">
          新建
        </Button>
      </div>
      <div className="classifyList">
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <span className="articlesNum">{item.count}</span>
              <span className="classifyName">《{item.classify}》</span>
              <EditOutlined
                className="classesEdit"
                onClick={() => openEditModal(item._id, item.class)}
              />
              <Popconfirm
                placement="top"
                title="确定要删除该分类吗？"
                onConfirm={() => deleteClass(item._id, item.class)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined className="classesDelete" />
              </Popconfirm>
            </List.Item>
          )}
        />
        ,
      </div>
    </div>
  );
};

export default Classify;
