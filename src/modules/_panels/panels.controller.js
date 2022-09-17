const db = require('../index.model');
const apiResponse = require('../../helpers/apiResponses');

const Panel = db.panels
const Position = db.position

// GET list of all Panles.
exports.panelList = async (req, res) => {
    try {
        // let panel = await Panel.findAll({})
        // let position = await Position.findAll({})
        Position.belongsTo(Panel,{foreignKey: 'panel_id'});
        Panel.hasOne(Position,{foreignKey : 'panel_id'});
        var panles = await Panel.findAll({include: [Position]});
        let msg = "Success"
        return apiResponse.successResponseWithData(res, msg, panles);
        // return res.status(200).send(panles)
    }
    catch (err) {
        return apiResponse.errorResponse(res, err);
    }
    // let data = {
    //     id: 0,
    //     name: "INDICATOR"
    // };
    // let msg = "success";
    // return apiResponse.successResponseWithData(res, msg, data);
};

exports.addPanel = async (req, res) => {
    try {
        // console.log(req.body)
        var newPanel = {
            panel_name: req.body.panel_name,
            panel_type: req.body.panel_type,
        };
        console.log(newPanel)
        let panel = await Panel.create(newPanel)

        var newPanelPosition = {
            x: req.body.position.x,
            y: req.body.position.y,
            width: req.body.position.width,
            height: req.body.position.height,
            panel_id: panel.id
        };
        // console.log(newPanelPosition)
        let position = await Position.create(newPanelPosition)

        let response = panel.dataValues
        Object.assign(response, {position: position.dataValues});
        // console.log("=======================")
        // console.log(panel)
        // console.log(panel.dataValues)
        // console.log(position)
        // console.log("=======================")
        let msg = "Panel Successfully Created";
        return apiResponse.successResponseWithData(res, msg, response);
    }
    catch (err) {
        return apiResponse.errorResponse(res, err);
    }
}