import React, { MouseEvent, useEffect } from "react";
import "./namecard.css";
type NamecardProps = {
  name: string;
};
type CustomMouseEvent = MouseEvent<HTMLElement>;

const Namecard = ({ name }: NamecardProps) => {
  const updateMousePosition = (ev: CustomMouseEvent) => {
    console.log(ev.clientX);
    console.log(ev.clientY);
  };
  return (
    <div className="namecardContainer" onMouseEnter={updateMousePosition}>
      <div className="namecard">
        <div className="namecard_front">
          <div>{name}</div>
          <div>퍼듀 대학교</div>
        </div>
        <div className="namecard_back">
          <div>This is the backside</div>
          <div>LinkedIn: alskdfjlasjdflasdflkjasf</div>
          <div>Instagram: asdjfkklasjdflkajsdlfjls</div>
        </div>
      </div>
    </div>
  );
};

export default Namecard;
