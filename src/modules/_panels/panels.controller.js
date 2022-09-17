const db = require('../index.model');
const apiResponse = require('../../helpers/apiResponses');

const Panel = db.panels
const Position = db.position
const Indicator = db.indicator
const TextIndicator = db.textIndicator

// GET list of all Panles.
exports.panelList = async (req, res) => {
    try {
        // let panel = await Panel.findAll({})
        // let position = await Position.findAll({})
        Panel.hasOne(Position,{foreignKey : 'panel_id'});
        Position.belongsTo(Panel,{foreignKey: 'panel_id'});
        let panles = await Panel.findAll({include: [Position]});
        let msg = "Success"
        return apiResponse.successResponseWithData(res, msg, panles);
        // return res.status(200).send(panles)
    }
    catch (err) {
        return apiResponse.errorResponse(res, err);
    }
};

// Create New Panel
exports.addPanel = async (req, res) => {
    try {
        let newPanel = {
            panel_name: req.body.panel_name,
            panel_type: req.body.panel_type,
        };
        console.log(newPanel)
        let panel = await Panel.create(newPanel)

        // Creating response object
        let response = panel.dataValues

        let newPanelPosition = {
            x: req.body.position.x,
            y: req.body.position.y,
            width: req.body.position.width,
            height: req.body.position.height,
            panel_id: panel.id
        };
        let position = await Position.create(newPanelPosition)

        // Add position to response object
        Object.assign(response, {position: position.dataValues});

        // PANEL
        if(req.body.panel_type === "INDICATOR") {
            let newIndicator = {
                top_header: req.body.indicator.top_header,
                value: req.body.indicator.value,
                unit: req.body.indicator.unit,
                bottom_header: req.body.indicator.bottom_header,
                panel_id: panel.id
            };
            let indicator = await Indicator.create(newIndicator)

            // Add indicator to response object
            Object.assign(response, {indicator: indicator.dataValues});
        } else if(req.body.panel_type === "TEXT_INDICATOR") {
            let newTextIndicator = {
                top_header: req.body.textIndicator.top_header,
                value: req.body.textIndicator.value,
                unit: req.body.textIndicator.unit,
                bottom_header: req.body.textIndicator.bottom_header,
                panel_id: panel.id
            };
            let textIndicator = await TextIndicator.create(newTextIndicator)

            // Add indicator to response object
            Object.assign(response, {textIndicator: textIndicator.dataValues});
        }

        let msg = "Panel Successfully Created";
        return apiResponse.successResponseWithData(res, msg, response);
    }
    catch (err) {
        return apiResponse.errorResponse(res, err);
    }
}