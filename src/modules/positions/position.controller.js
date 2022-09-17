const Position = require('./position.model');
// const DB = require('../index.model');
const apiResponse = require('../../helpers/apiResponses');
// var mongoose = require('mongoose');

// GET list of all students.
exports.positionList = function (req, res) {
    // try {
    //     Student.find().populate('division').then((students) => {
    //         return apiResponse.successResponseWithData(res, 'Success', students);
    //     });
    // }
    // catch (err) {
    //     return apiResponse.errorResponse(res, err);
    // }
    let data = {
        id: 0,
        name: "Position"
    };
    let msg = "success";
    return apiResponse.successResponseWithData(res, msg, data);
};