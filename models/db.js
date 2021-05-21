const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_sn_21', 'root', 'xxxx', {
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = sequelize;