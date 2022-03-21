import React from "react";
import LoginBox from "./LoginBox";
import LoginBg from "./LoginBg";

import "./style.css";

const Login = () => {
  console.log("login");
  return (
    <div className="login">
      <LoginBg />
      <LoginBox />
    </div>
  );
};

export default Login;
