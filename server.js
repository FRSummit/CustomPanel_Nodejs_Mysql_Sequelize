const express = require("express");
var cors = require("cors");
// const connection = require("./config");

const apiResponse = require("./src/helpers/apiResponses");
var routerService = require("./src/routes/router.service");
  
// connection.connect( (err) => {
//     if (err) throw err;
//     console.log("Connected!");
//     console.log("Connected to %s", 5);
//   });

// connection.end((err) => {
//     // The connection is terminated gracefully
//     // Ensures all remaining queries are executed
//     // Then sends a quit packet to the MySQL server.
//   });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//To allow cross-origin requests
app.use(cors());

routerService.registerRoutes(app);

// throw 404 if URL not found
app.all("*", (req, res) => {
  return apiResponse.notFoundResponse(res, "Page not found");
});

app.listen(3000, (req, res) => console.log("running on 3000"));
// module.exports = app;