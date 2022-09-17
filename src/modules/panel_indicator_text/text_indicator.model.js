// const Position = require('../positions/position.model')

module.exports = (sequelize, DataTypes) => {

    const TextIndicator = sequelize.define("indicator_text", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        top_header: {
            type: DataTypes.STRING
        },
        value: {
            type: DataTypes.STRING
        },
    })

    return TextIndicator

}








// 'use strict';
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Panel extends Model {
//     static associate({Position}) {
//       // define association here
//     //   this.hasMany(Post, {foreignKey: 'userId',  as: 'posts' })
//       this.hasOne(Position, {foreignKey: 'panelId',  as: 'panels' })
//     }
//   };
//   Panel.init({
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.INTEGER
//     },
//     panel_name: {
//         type: DataTypes.STRING
//     },
//     panel_type: {
//         type: DataTypes.STRING
//     },
//     // name:{
//     //   type:DataTypes.STRING,
//     //   allowNull: false,
//     //   validate:{
//     //     notNull: {msg: "Name is required"},
//     //     notEmpty: {msg: "Name cannot be empty"},
//     //   }
//     // },
//     // email:{
//     //   type:DataTypes.STRING,
//     //   allowNull: false,
//     //   unique: true,
//     //   validate:{
//     //     isEmail: {msg: "It must be a valid Email  address"},
//     //   }
//     // },
//     // role:{
//     //   type:DataTypes.STRING,
//     //   allowNull: false,
//     // },
//   },
//   {
//     sequelize,
//     //define table name
//     tableName: 'users',
//     modelName: 'User',
//   });
//   return User;
// };






// // const dbConfig = require('../config/dbConfig');
// const { Sequelize, DataTypes } = require('sequelize');

// module.exports = function(Sequelize, DataTypes){
//     var Panel = Sequelize.define(
//         'Panel', {
//             name: {
//                 type: DataTypes.STRING,
//                 allowNull: false
//             }
//         },
//         {
//             classMethods:{
//                 associate:function(models){
//                     Panel.hasMany(models.Position, { foreignKey: 'panelId'} );
//                 }
//             }
//         }

//     );
//     return Panel;
// };