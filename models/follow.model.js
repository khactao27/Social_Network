const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const user = require('./user.model');

const Comment = sequelize.define('follow', {
    following_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        references: {
            model: user,
            key: 'user_id'
        }
    },
    follower_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        references: {
            model: user,
            key: 'user_id'
        }
    }
}, {
    tableName: 'Follow',
    timestamps: false
});
module.exports = Follow;