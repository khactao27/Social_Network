const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');
const User = require('./user.model');
const Post = require('./post.model');

const Comment = sequelize.define('Comment', {
    comment_id:{
        type: DataTypes.STRING(45),
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        references:{
            model: User,
            key: 'user_id'
        }
    },
    post_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        references:{
            model: Post,
            key: 'post_id'
        }
    },
    content: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'comment',
    timestamps: false
});

module.exports = Comment;