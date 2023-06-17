import React from "react";
import "./block-square-big.css";
import { useNavigate } from "react-router-dom";

type BlockSquareBigProps = {
  id: number;
  title: string;
  address: string;
};

const BlockSquareBig = ({ id, title, address }: BlockSquareBigProps) => {
  const navigate = useNavigate();
  const navigateToAppPage = () => {
    navigate(address, { replace: false });
  };

  return (
    <div
      className="SquareContainer isButton disableTextSelect"
      onClick={navigateToAppPage}
    >
      <h1>{title}</h1>
    </div>
  );
};

export default BlockSquareBig;
