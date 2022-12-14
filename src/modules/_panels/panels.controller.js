// image Upload
const multer = require('multer')
const path = require('path')


const db = require('../index.model');
const apiResponse = require('../../helpers/apiResponses');

const Panel = db.panels
const Position = db.position
const Indicator = db.indicator
const TextIndicator = db.textIndicator
const Chart = db.chart
const ChartYSeries = db.chart_y_series

// POSITION
Panel.hasOne(Position,{foreignKey : 'panel_id'});
Position.belongsTo(Panel,{foreignKey: 'panel_id'});

// INDICATOR
Panel.hasOne(Indicator,{foreignKey : 'panel_id'});
Indicator.belongsTo(Panel,{foreignKey: 'panel_id'});

// TEXT INDICATOR
Panel.hasOne(TextIndicator,{foreignKey : 'panel_id'});
TextIndicator.belongsTo(Panel,{foreignKey: 'panel_id'});

// CHART
Panel.hasOne(Chart,{foreignKey : 'panel_id'});
Chart.belongsTo(Panel,{foreignKey: 'panel_id'});

// CHART SERIES
Chart.hasMany(ChartYSeries,{foreignKey : 'chart_id'});
ChartYSeries.belongsTo(Chart,{foreignKey: 'chart_id'});

// 1. ============= GET list of all Panles =============
exports.panelList = async (req, res) => {
    try {
        // let panel = await Panel.findAll({})
        // let position = await Position.findAll({})

        // let ch = await Chart.findAll({include: [ChartYSeries]})
        // let panles = await Panel.findAll({include: [Position, Indicator, TextIndicator, Chart]});
        let panels = await Panel.findAll({
            include: [
                {model: Position}, 
                {model: Indicator}, 
                {model: TextIndicator}, 
                {model: Chart,
                    include: [ChartYSeries]
                }
            ]
        });
        let msg = "Success"
        return apiResponse.successResponseWithData(res, msg, panels);
        // return res.status(200).send(panles)
    }
    catch (err) {
        return apiResponse.errorResponse(res, err);
    }
};

// 2. ============= Create New Panel =============
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

        // PANELS
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
                panel_id: panel.id
            };
            let textIndicator = await TextIndicator.create(newTextIndicator)

            // Add text indicator to response object
            Object.assign(response, {textIndicator: textIndicator.dataValues});
        } else if(req.body.panel_type === "CHART") {
            let newChart = {
                chart_name: req.body.chart.chart_name,
                chart_type: req.body.chart.chart_type,
                is_active: req.body.chart.is_active,
                x_axis_label: req.body.chart.x_axis_label,
                y_axis_label: req.body.chart.y_axis_label,
                x_axis_category: req.body.chart.x_axis_category,
                dataset: req.body.chart.dataset,
                panel_id: panel.id
            }
            let chart = await Chart.create(newChart)
            console.log("============================")

            // Creating chart response object
            let chart_response = chart.dataValues

            let series_arr = []
            req.body.chart.y_axis_categories.map( async (cat) => {
                let chartSeries = {
                    series_name: cat.series_name,
                    category_name: cat.category_name,
                    chart_id: chart.id
                };
                let series = await ChartYSeries.create(chartSeries)
                // console.log(series.dataValues)
                series_arr.push(series.dataValues)
            })
            // const series_arr =  await ChartYSeries.findAll({ where: { chart_id: chart.id }})
            // console.log("=================")
            console.log(series_arr)
    
            // Add series to response object
            // Object.assign(chart_response, {y_axis_categories: series.dataValues});
            Object.assign(chart_response, {y_axis_categories: series_arr});

            // Add chart to response object
            // Object.assign(response, {chart: chart.dataValues});
            Object.assign(response, {chart: chart_response});
        }

        let msg = "Panel Successfully Created";
        return apiResponse.successResponseWithData(res, msg, response);
    }
    catch (err) {
        return apiResponse.errorResponse(res, err);
    }
}


// 3. ============= Get Single Panel =============
exports.getSinglePanel = async (req, res) => {
    try {
        let id = req.params.id
        let panel = await Panel.findOne({ where: { id: id }, include: [
            {model: Position}, 
            {model: Indicator}, 
            {model: TextIndicator}, 
            {model: Chart,
                include: [ChartYSeries]
            }
        ]})
        let msg = "Success"
        return apiResponse.successResponseWithData(res, msg, panel);
        // res.status(200).send(panel)
    }
    catch (err) {
        return apiResponse.errorResponse(res, err);
    }
}

// 4. ============= Update Panel =============
exports.updatePanel = async (req, res) => {
    let id = req.params.id
    const product = await Panel.update(req.body, { where: { id: id }})
    res.status(200).send(product)
}

// 5. ============= Delete Panel =============
exports.deletePanel = async (req, res) => {
    let id = req.params.id    
    await Panel.destroy({ where: { id: id }} )
    res.status(200).send('Panel is deleted !')
}

// 6. ============= Get Panel by WHERE query =============
exports.getpanelByType = async (req, res) => {
    const panels =  await Panel.findAll({ where: { panel_type: panel_type }})
    res.status(200).send(panels)
}

// 7. ============= Connect one to many relation and find one =============
// 8. ============= Upload Image =============
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

exports.upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')



// const getPanelRelation = () => {
// }

// module.exports = {
//     getPanelRelation,
//     getSinglePanel,
//     // addProduct,
//     // getAllProducts,
//     // getOneProduct,
//     // updateProduct,
//     // deleteProduct,
//     // getPublishedProduct,
//     // getProductReviews,
//     // upload
    
// }