const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const user = require('./user.model');
const post = require('./post.model');

const Love = sequelize.define('love', {
    post_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        references: {
            model: post,
            key: 'post_id'
        }
    },

    user_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        references: {
            model: user,
            key: 'user_id'
        }
    }
}, {
    tableName: 'Love',
    timestamps: false
});

module.exports = Love;
