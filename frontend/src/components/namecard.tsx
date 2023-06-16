import React, { MouseEvent, useEffect, useState } from "react";
import "./namecard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebook,
  faFacebookSquare,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
type NamecardProps = {
  name: string;
};
type CustomMouseEvent = MouseEvent<HTMLElement>;

const Namecard = ({ name }: NamecardProps) => {
  const [start, setStart] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [xDir, setXDir] = useState(0);
  const [yDir, setYDir] = useState(0);
  let speed: number = 1;
  let tiltAngle: number = 20;

  const isNamecardFront = (deg: number): boolean => {
    let normalXDeg: number = Math.abs(deg) % 360;
    if (
      (normalXDeg >= 0 && normalXDeg < 90) ||
      (normalXDeg >= 270 && normalXDeg < 360)
    ) {
      //front
      return true;
    }
    //back
    return false;
  };
  const updateMousePosition = (ev: CustomMouseEvent) => {
    if (ev.type === "mousedown") {
      setStart(true);
    } else if (ev.type === "mouseup") {
      setStart(false);
    } else if (ev.type === "mouseleave") {
      setStart(false);
    }
  };

  const getMouseAngle = (ev: CustomMouseEvent) => {
    if (start) {
      if (lastX < ev.clientX) {
        //right
        setXDir(xDir + speed);
      } else if (lastX > ev.clientX) {
        //left
        setXDir(xDir - speed);
      }

      //change direction if card is backside.
      if (lastY < ev.clientY) {
        //down
        if (isNamecardFront(xDir)) {
          if (yDir > -tiltAngle) {
            setYDir(yDir - speed);
          }
        } else {
          if (yDir < tiltAngle) {
            setYDir(yDir + speed);
          }
        }
      } else if (lastY > ev.clientY) {
        //up
        if (isNamecardFront(xDir)) {
          if (yDir < tiltAngle) {
            setYDir(yDir + speed);
          }
        } else {
          if (yDir > -tiltAngle) {
            setYDir(yDir - speed);
          }
        }
      }
      setLastX(ev.clientX);
      setLastY(ev.clientY);
    }
  };
  return (
    <div
      className="namecardContainer"
      onMouseDown={updateMousePosition}
      onMouseUp={updateMousePosition}
      onMouseLeave={updateMousePosition}
      onMouseMove={getMouseAngle}
    >
      <div
        className="namecard disableTextSelect"
        style={{
          transform: `rotate3d(0, 1, 0, ${xDir}deg) rotate3d(1, 0, 0, ${yDir}deg)`,
        }}
      >
        <div className="namecard_front">
          <div>Don't let segfault let you down</div>
        </div>
        <div className="namecard_back">
          <div className="namecard_back_leftside">{name}</div>
          <div className="namecard_back_rightside">
            <div className="namecard_back_rightside_socialContainer">
              <FontAwesomeIcon
                icon={faLinkedin}
                size="2xl"
                className="isButton"
              />
              <span>LinkedIn</span>
            </div>

            <div className="namecard_back_rightside_socialContainer">
              <FontAwesomeIcon
                icon={faInstagram}
                size="2xl"
                className="isButton"
              />
              <span>Instagram</span>
            </div>
            <div className="namecard_back_rightside_socialContainer">
              <FontAwesomeIcon
                icon={faYoutube}
                size="2xl"
                className="isButton"
              />
              <span>Youtube</span>
            </div>
            <div className="namecard_back_rightside_socialContainer">
              <FontAwesomeIcon
                icon={faFacebook}
                size="2xl"
                className="isButton"
              />
              <span>Facebook</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Namecard;
