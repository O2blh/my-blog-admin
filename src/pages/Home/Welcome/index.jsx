import React from "react";
import { reqSvgs } from "../../../utils/commons";
import "./style.css";

const Welcome = () => {
  const avatarUrl = reqSvgs("./tx.png");
  return (
    <div className="welcomeBox">
      <img alt="" src={avatarUrl} className="homeAvatar" />
      <span className="welcomeTitle">
        夜深了, <span className="userName">游客</span>!
      </span>
      <span className="poemContent">
        斜风细雨作春寒，对尊前，忆前欢。
        <span className="poemTitle"> —— 朱淑真</span>
      </span>
    </div>
  );
};

export default Welcome;
