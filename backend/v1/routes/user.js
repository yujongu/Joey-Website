require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.route("/hi").get((req, res) => {
  res.send(`hello world hahahahahahaha user`);
});



module.exports = router;
