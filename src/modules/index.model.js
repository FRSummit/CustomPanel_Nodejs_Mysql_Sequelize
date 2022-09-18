// THIS IS THE FILE WHERE ALL RELATIONS WILL DEFINE
const dbConfig = require('../config/dbConfig');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        // operatorsAliases: false,
        operatorsAliases: 0,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.panels = require('./_panels/panels.model')(sequelize, DataTypes)
db.position = require('./positions/position.model')(sequelize, DataTypes)
db.indicator = require('./panel_indicator/indicator.model')(sequelize, DataTypes)
db.textIndicator = require('./panel_indicator_text/text_indicator.model')(sequelize, DataTypes)
db.chart = require('./panel_chart/chart.model')(sequelize, DataTypes)
db.chart_y_series = require('./panel_chart/chart_y_series.model')(sequelize, DataTypes)

// db.chart_line = require('./panel_chart/line.chart.model')(sequelize, DataTypes)
// db.chart_line_series = require('./panel_chart/line_series.chart.model')(sequelize, DataTypes)
// db.chart_bar = require('./panel_chart/bar.chart.model')(sequelize, DataTypes)
// db.chart_bar_series = require('./panel_chart/bar_series.chart.model')(sequelize, DataTypes)
// db.chart_pie = require('./panel_chart/pie.chart.model')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})



// // 1 to Many Relation

// db.panels.hasMany(db.position, {
db.panels.hasOne(db.position, { foreignKey: 'panel_id', as: 'position' })
db.position.belongsTo(db.panels, { foreignKey: 'panel_id', as: 'panel' })

db.panels.hasOne(db.indicator, { foreignKey: 'panel_id', as: 'indicator' })
db.indicator.belongsTo(db.panels, { foreignKey: 'panel_id', as: 'panel' })

db.panels.hasOne(db.textIndicator, { foreignKey: 'panel_id', as: 'textIndicator' })
db.textIndicator.belongsTo(db.panels, { foreignKey: 'panel_id', as: 'panel' })

db.panels.hasOne(db.chart, { foreignKey: 'panel_id', as: 'chart' })
db.chart.belongsTo(db.panels, { foreignKey: 'panel_id', as: 'panel' })

db.chart.hasMany(db.chart_y_series, { foreignKey: 'chart_id', as: 'chart_y_series' })
db.chart_y_series.belongsTo(db.chart, { foreignKey: 'chart_id', as: 'chart' })

// db.chart.hasOne(db.chart_line, { foreignKey: 'chart_id', as: 'chart_line' })
// db.chart_line.belongsTo(db.chart, { foreignKey: 'chart_id', as: 'chart' })

// db.chart_line.hasOne(db.chart_line_series, { foreignKey: 'line_chart_id', as: 'chart_line_series' })
// db.chart_line_series.belongsTo(db.chart_line, { foreignKey: 'line_chart_id', as: 'chart_line' })

// db.chart.hasOne(db.chart_bar, { foreignKey: 'chart_id', as: 'chart_bar' })
// db.chart_bar.belongsTo(db.chart, { foreignKey: 'chart_id', as: 'chart' })

// db.chart_bar.hasOne(db.chart_bar_series, { foreignKey: 'bar_chart_id', as: 'chart_bar_series' })
// db.chart_bar_series.belongsTo(db.chart_bar, { foreignKey: 'bar_chart_id', as: 'chart_bar' })

// db.chart.hasOne(db.chart_pie, { foreignKey: 'chart_id', as: 'chart_pie' })
// db.chart_pie.belongsTo(db.chart, { foreignKey: 'chart_id', as: 'chart' })





module.exports = db
