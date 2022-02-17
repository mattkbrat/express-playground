var express = require('express');
var router = express.Router();

const users = [
  {'id':1,'name':'Matt'}
]

/* GET users listing.
* https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial */

router.route("/").get(async function (req, res) {
  const dbConnect = req.app.locals.db;

  dbConnect
      .collection("users")
      .find({}).limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
        } else {
          res.json(result);
        }
      });
});

router.post('/', function (req, res, next){
  const user = {
    "name": req.body.name
  }

  let db = req.app.locals.db;

  db.collection('users').insertOne(user);
  res.send("User inserted!");
});

module.exports = router;
