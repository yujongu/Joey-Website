import React, { MouseEvent, useEffect, useState } from "react";
import "./namecard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { NamecardProps } from "../types";

const Namecard = ({ name, phrase }: NamecardProps) => {
  const [xDir, setXDir] = useState(0);
  const [yDir, setYDir] = useState(0);

  const updateRotation = () => {
    setXDir(xDir + 180);
    setYDir(
      Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1)
    );
  };

  const redirectToSocial = () => {
    console.log("HI");
  };

  return (
    <div className="namecardContainer">
      <div
        style={{
          backgroundColor: "white",
          position: "absolute",
          right: -40,
          bottom: 0,
          borderRadius: "50%",
          padding: "5px",
        }}
        onClick={updateRotation}
      >
        <FontAwesomeIcon
          icon={faArrowRotateRight}
          size="xl"
          className="isButton"
        />
      </div>
      <div
        className="namecard disableTextSelect"
        style={{
          transform: `rotateY(${xDir}deg)  rotateX(${yDir}deg)`,
        }}
      >
        <div className="namecard_front">
          <div>{phrase}</div>
        </div>
        <div className="namecard_back">
          <div className="namecard_back_leftside">{name}</div>
          <div className="namecard_back_rightside">
            <div className="namecard_back_rightside_socialContainer">
              <FontAwesomeIcon icon={faLinkedin} size="2xl" />
              <span>LinkedIn</span>
            </div>

            <div className="namecard_back_rightside_socialContainer">
              <FontAwesomeIcon icon={faInstagram} size="2xl" />
              <span>Instagram</span>
            </div>
            <div
              className="namecard_back_rightside_socialContainer isButton"
              onClick={redirectToSocial}
            >
              <FontAwesomeIcon icon={faYoutube} size="2xl" />
              <span>Youtube</span>
            </div>
            <div className="namecard_back_rightside_socialContainer">
              <FontAwesomeIcon icon={faFacebook} size="2xl" />
              <span>Facebook</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Namecard;
