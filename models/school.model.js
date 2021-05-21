const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');

const School = sequelize.define('School', {
    school_id:{
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true
    },
    school_name:{
        type: DataTypes.STRING(200),
        allowNull: false
    }
}, {
    tableName: 'school',
    timestamps: false
});
module.exports = School;