const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const school = require('./school.model');

const Classes = sequelize.define('classes', {
    class_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true
    },
    class_name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    school_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        references: {
            model: school,
            key: 'school_id'
        }
    }
}, {
    tableName: 'Class',
    timestamps: false
});
module.exports = Classes;
