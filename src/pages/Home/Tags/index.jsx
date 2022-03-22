import React, { useRef } from "react";
import { Button } from "antd";
import "./style.css";
const Tags = () => {
  const inputRef = useRef();
  return (
    <div className="tagBox">
      <div className="tagTitle">标签</div>
      <div className="tagCreateBox">
        <input
          className="tagCreateInput"
          type="text"
          ref={inputRef}
          placeholder="请输入新的分类..."
        />
        <Button className="tagCreateBtn" type="primary">
          新建
        </Button>
      </div>
      <div className="tagListg"></div>
    </div>
  );
};

export default Tags;
