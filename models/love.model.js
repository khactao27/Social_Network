const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');
const User = require('./user.model');
const Post = require('./post.model');

const Love = sequelize.define('Love', {
    post_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
        references:{
            model: Post,
            key: 'post_id'
        }
    },
    user_id:{
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
        references:{
            model: User,
            key: 'user_id'
        }
    }
}, {
    tableName:'loves',
    timestamps: false
});

module.exports = Love;