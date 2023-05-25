require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { create, get } = require("../services/user");

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
      console.log("Route err", err);
      // res.status(404).send()
    });
});

module.exports = router;
