const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const user = require('./user.model');

const Post = sequelize.define('post', {
    post_id: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        references: {
            model: user,
            key: 'user_id'
        }
    },
    caption: {
        type: DataTypes.STRING(300),
        allowNull: true
    },
    timestamp: {
        type: DataTypes.DATETIME,
        allowNull: false
    },
    img_url: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    num_of_loves: {
        types: DataTypes.INTEGER,
        allowNull: false
    },
    num_of_comments: {
        types: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Post',
    timestamps: false
});

module.exports = Post;
