import React from "react";
import "./block-square-big.css";

type BlockSquareBigProps = {
  title: string;
};

const BlockSquareBig = ({ title }: BlockSquareBigProps) => (
  <div className="SquareContainer">
    <span>This is block square big</span>
    <h1>{title}</h1>
  </div>
);

export default BlockSquareBig;
