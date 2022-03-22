import React from "react";

import "./style.css";

const Card = ({ data }) => {
  return (
    <div className="cardBox">
      <div className="cardLabel">{data.label}</div>
      <div className="cardNumber">{data.number}</div>
    </div>
  );
};

export default Card;
