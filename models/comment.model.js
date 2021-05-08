const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const user = require('./user.model');
const post = require('./post.model');

const Comment = sequelize.define('comment', {
    comment_id: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        references: {
            model: user,
            key: 'user_id'
        }
    },
    post_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        references: {
            model: post,
            key: 'post_id'
        }
    },
    content: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATETIME,
        allowNull: false
    }
}, {
    tableName: 'Comment',
    timestamps: false
});
module.exports = Comment;