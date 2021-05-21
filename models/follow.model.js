const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');
const User = require('./user.model');

const Follow = sequelize.define('Follow', {
    following_id:{
        type: DataTypes.STRING(45),
        allowNull: false,
        references:{
            model: User,
            key: 'user_id'
        }
    },
    follower_id:{
        type: DataTypes.STRING(45),
        allowNull: false,
        references:{
            model: User,
            key: 'user_id'
        }
    }
}, {
    tableName: 'follow',
    timestamps: false
});

module.exports = Follow;