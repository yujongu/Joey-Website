const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const noVerif = [
    "/",
    "/favicon.ico",
    "/api/v1/user/hi",
    "/api/v1/user/login",
    "/api/v1/user/signup",
  ];

  if (noVerif.includes(req.path)) {
    return next();
  }
  console.log("JWT Auth User");

  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    console.log("Error in Token");
    return res.status(403).send("A token is required for authentication");
  }
  try {
    let parts = token.split(" ");
    if (parts.length == 2) {
      let scheme = parts[0];
      let realToken = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        const decoded = jwt.verify(realToken, process.env.JWTSECRET);
        req.user = decoded;
      }
    }
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
