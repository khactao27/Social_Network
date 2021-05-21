const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');
const Class = require('./class.model'); 

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        allowNull: false
    },
    firstname:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate:{
            is:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    class_id:{
        type: DataTypes.STRING(45),
        allowNull: false,
        references: {
            model: Class,
            key:'class_id'
        }
    },
    gender:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    birthday:{
        type: DataTypes.DATE,
        allowNull: false
    },
    hometown:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    followers:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    authority:{
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = User;