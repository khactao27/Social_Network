const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const classes = require('./class.model'); 

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    lastname: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    email:{
        type: DataTypes.STRING(45),
        allowNull: true
    },
    password: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    class_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
        references: {
            model: classes,
            key: 'class_id'
        }
    },
    gender: {
        type: DataTypes.INTEGER(1),
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATETIME,
        allowNull: true
    },
    hometown: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    status: {
        type: DataTypes.INTEGER(1),
        allowNull: false
    },
    followers: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    authority: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
},{
    tableName: 'User',
    timestamps: false
});
User.prototype.isUser = async (user_id, password)=>{
    let rs = await User.findOne({
        where:{
            user_id: user_id,
            password: password
        }
    });
    if(rs === null){
        console.log("Incorection Password or Username");
    }
}

module.exports = User;
