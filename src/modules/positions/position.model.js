module.exports = (sequelize, DataTypes) => {

    const Position = sequelize.define("position", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        x: {
            type: DataTypes.STRING
        },
        y: {
            type: DataTypes.STRING
        },
        width: {
            type: DataTypes.STRING
        },
        height: {
            type: DataTypes.STRING
        },
    })

    return Position

}