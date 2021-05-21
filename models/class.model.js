const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');
const School = require('./school.model');

const Class = sequelize.define('Class', {
    class_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true
    },
    class_name: {
        type: DataTypes.STRING(45),
        allowNull: null
    },
    school_id:{
        type: DataTypes.STRING(45),
        allowNull: false,
        references:{
            model: School,
            key: 'school_id'
        }
    }
}, {
    tableName: 'class',
    timestamps: false
});

module.exports = Class;
