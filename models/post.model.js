const sequelize = require('./db');
const {DataTypes, Model} = require('sequelize');
const User = require('./user.model');

const Post = sequelize.define('Post', {
    post_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true
    },
    user_id:{
        type: DataTypes.STRING(45),
        allowNull: false,
        references:{
            model: User,
            key: 'user_id'
        }
    },
    caption:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
    img_url:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    num_of_loves: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    num_of_comments: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'post',
    timestamps: false
});
module.exports = Post;