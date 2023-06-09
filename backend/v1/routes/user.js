require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { create, get, update } = require("../services/user");

router.route("/hi").get((req, res) => {
  res.send(`hello world  from user`);
});

router.route("/signup").post((req, res) => {
  let uid = req.body.user.userId;
  let pw = req.body.user.password;
  let name = req.body.user.name;

  //create hash with bcrypt
  const saltRound = 12;
  bcrypt.hash(pw, saltRound, (err, hash) => {
    create({ uid, name, hash })
      .then((resp) => {
        console.log("Route", resp);
        res.status(200).send({ message: resp });
      })
      .catch((err) => {
        console.log("Route Err", err);

        res.status(404).send({ message: err });
      });
  });
});

router.route("/login").post((req, res) => {
  let uid = req.body.user.userId;
  let pw = req.body.user.password;

  get(uid)
    .then((resp) => {
      console.log("Route", resp);

      bcrypt.compare(pw, resp.password, (err, isValid) => {
        if (err) {
          console.log("Bcrypt Error", err);
          res.status(404).send({ message: "something Went Wrong" });
        }
        if (isValid) {
          const token = jwt.sign(
            { user_id: resp.user_id },
            process.env.JWTSECRET,
            {
              expiresIn: "2h",
            }
          );

          console.log("resp", resp);
          res.status(200).send({
            message: "Correct",
            data: {
              uid: resp.user_id,
              name: resp.user_name,
              joined: resp.created_at,
              token: token,
            },
          });
        } else {
          res.status(200).send({ message: "Incorrect" });
        }
      });
    })
    .catch((err) => {
      console.log("Route Err", err);
      res.status(404).send({ message: "User Not Found" });
    });
});

router.route("/me").get((req, res) => {
  const uid = req.user.user_id;
  get(uid).then((data) => {
    const userData = {
      name: data.user_name,
      phrase: data.my_phrase,
      wLocation: data.weather_location,
      tempUnit: data.temp_unit,
      socialsInstagram: data.social_Instagram,
      socialsFacebook: data.social_Facebook,
      socialsYouTube: data.social_YouTube,
      socialsLinkedIn: data.social_LinkedIn,
    };
    res.status(200).send(userData);
  });
});

router.route("/update").put((req, res) => {
  const uid = req.user.user_id;
  update(
    uid,
    req.body.phrase,
    req.body.location,
    req.body.tempUnit,
    req.body.LinkedIn,
    req.body.Instagram,
    req.body.Facebook,
    req.body.YouTube
  )
    .then((resp) => {
      console.log("Route", resp);
      res.status(200).send({ message: resp });
    })
    .catch((err) => {
      console.log("Route Err", err);

      res.status(404).send({ message: err });
    });
});

module.exports = router;
