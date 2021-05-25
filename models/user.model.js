const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');
const Class = require('./class.model'); 

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        allowNull: false
    },
    fullname:{
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
        type: DataTypes.STRING(500),
        allowNull: false
    },
    class_id:{
        type: DataTypes.STRING(45),
        allowNull: false,
        references: {
            model: Class,
            key:'class_id'
        },
        defaultValue: "IT2-01 K63"
    },
    gender:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
    },
    birthday:{
        type: DataTypes.DATE,
        allowNull: false
    },
    hometown:{
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: "Hanoi"
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    followers:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    authority:{
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'user'
    },
    avatar: {
        type: DataTypes.STRING(300),
        allowNull: false,
        defaultValue: '/avatar/avatar_default.png'
    }
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = User;