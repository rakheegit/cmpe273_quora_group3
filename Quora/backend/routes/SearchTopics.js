const express = require("express");
const router = express.Router();
const Model = require("../database/connection");

// Route to GET topics according to the search term
router.get("/", function(req, res) {
  console.log("GET /searchTopics");
  console.log("Req: ", req.query[0].toLowerCase());

  let searchValue = req.query[0].toLowerCase();
  let searchedTopics = [];

  Model.topics.find({}, (err, results) => {
    console.log("XXXXXXXXXXXXXXXXXXXXx");

    if (err) {
      console.log("Unable to fetch topics", err);
      res.status(400).send("Unable to fetch topics!");
    } else {
      if (results) {
        console.log("XXXXXXXXXXXXXXXXXXXXx", results);

        for (var key in results) {
          let currentTerm = results[key].title.toLowerCase();
          if (currentTerm.includes(searchValue)) {
            searchedTopics.push(results[key]);
          }
        }
        if (searchedTopics === []) {
          console.log("No topics found with the entered search term!");
          res.status(400).send("No topics found with the entered search term!");
        } else {
          console.log("searchedTopics: ", searchedTopics);
          res.status(200).send(searchedTopics);
        }

        //res.status(200).end("Course already enrolled!"); // res.end will end the response here and dont go futher in this post request? But this doesnt work here why? return res.end also doesnt work if a db.query is after this db.query
      } else {
        console.log("No topics found in database!", err);
        res.status(400).send("No topics found in database!");
      }
    }
  });
});

module.exports = router;
