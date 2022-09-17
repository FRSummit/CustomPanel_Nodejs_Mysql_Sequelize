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





module.exports = db
