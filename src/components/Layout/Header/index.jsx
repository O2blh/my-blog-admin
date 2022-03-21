import React from "react";
import { HomeOutlined, LoginOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { BLOG_URL } from "../../../constants/info";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions";

import "./style.css";
const Header = () => {
  const dispatch = useDispatch();
  const loginOut = () => {
    localStorage.clear();
    dispatch(login(false));
  };
  return (
    <div className="HeaderBox">
      <a href={BLOG_URL} className="blogBtn" target="_blank" rel="noreferrer">
        <HomeOutlined />
      </a>
      <Popconfirm
        className="loginOutBtn"
        title="确定要退出登录嘛?"
        onConfirm={loginOut}
        okText="Yes"
        cancelText="No"
      >
        <LoginOutlined />
      </Popconfirm>
    </div>
  );
};

export default Header;
