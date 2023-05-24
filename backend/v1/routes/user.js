require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const bcrypt = require("bcrypt");
const { create } = require("../services/user");

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

module.exports = router;
