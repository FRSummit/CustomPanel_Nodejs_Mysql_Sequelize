const User = require('./user.model');
const apiResponse = require('../../helpers/apiResponses');
// var mongoose = require('mongoose');

// GET list of all students.
exports.userList = function (req, res) {
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
        name: "F R Summit"
    };
    let msg = "success";
    return apiResponse.successResponseWithData(res, msg, data);
};