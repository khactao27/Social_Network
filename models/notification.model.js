const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const user = require('./user.model');

const Notification = sequelize.define('Notification', {
    noti_id: {
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
    noti_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    actor_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        references: {
            model: user,
            key: 'user_id'
        }
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'notification',
    timestamps: false
});

module.exports = Notification;
