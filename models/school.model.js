const sequelize = require('./db');
const {DataTypes} = require('sequelize');

const School = sequelize.define('school', {
    school_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
    },
    school_name: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
}, {
    tableName: 'School',
    timestamps: false
});
module.exports = School;
