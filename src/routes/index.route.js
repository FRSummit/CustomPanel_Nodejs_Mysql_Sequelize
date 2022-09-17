var express = require("express");
const apiResponse = require("../helpers/apiResponses");
var router = express.Router();

router.get("/", function (req, res) {
  return apiResponse.successResponse(res, "Welcome to Custom Panel");
});

module.exports = router;