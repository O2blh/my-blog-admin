import React from "react";
import Card from "./Card";

const Cards = (props) => {
  console.log(props);
  console.log(props.statisticData);
  return (
    <>
      {props.statisticData.map((item) => {
        return <Card data={item} />;
      })}
    </>
  );
};

export default Cards;
