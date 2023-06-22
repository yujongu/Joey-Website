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

function get(uid) {
  const sqlQuery = "SELECT * FROM user WHERE user_id = ?;";

  let returnMessage = "User Not Found";
  const getUser = new Promise((resolve, reject) => {
    db.query(sqlQuery, [uid], (err, res) => {
      if (err || res.length != 1) {
        console.error("Error with get user", err);
        reject(returnMessage);
      } else {
        resolve(res[0]);
      }
    });
  });
  return getUser;
}

function update(
  uid,
  phrase,
  location,
  tempUnit,
  LinkedIn,
  Instagram,
  Facebook,
  YouTube
) {
  const sqlQuery =
    "UPDATE user SET my_phrase = ?, weather_location = ?, temp_unit = ?, social_Instagram = ?, social_Facebook = ?, social_YouTube = ?, social_LinkedIn = ? WHERE user_id = ?;";
  let returnMessage = "Update User Error";
  const updateUser = new Promise((resolve, reject) => {
    db.query(
      sqlQuery,
      [phrase, location, tempUnit, Instagram, Facebook, YouTube, LinkedIn, uid],
      (err, res) => {
        if (err || res.affectedRows != 1) {
          console.error("Error with update user", err);
          reject(returnMessage);
        } else {
          resolve(res);
        }
      }
    );
  });
  return updateUser;
}
module.exports = { create, get, update };
