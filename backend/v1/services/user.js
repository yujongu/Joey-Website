const db = require("./connection.js");
function create(user) {
  const sqlQuery =
    "INSERT INTO user (user_id, password, user_name, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP());";

  let returnMessage = "UID Exists";

  const createUser = new Promise((resolve, reject) => {
    db.query(sqlQuery, [user.uid, user.hash, user.name], function (err, res) {
      if (err) {
        console.error("Error with create user", err);
        reject(returnMessage);
      } else {
        returnMessage = "OK";
        resolve(returnMessage);
      }
    });
  });

  return createUser;
}
module.exports = { create };
