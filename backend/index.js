const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const port = 3001;

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(
  cors({
    origin: "http://localhost:3000", // restrict calls to those this address
    methods: "GET", // only allow GET requests
  })
);

// adding morgan to log HTTP requests
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("It's working!");
});

const weatherRouter = require("./v1/routes/weather.js");
app.use("/api/v1/weather", weatherRouter);
const userRouter = require("./v1/routes/user.js");
app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
