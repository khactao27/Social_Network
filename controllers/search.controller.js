let User = require('../models/user.model');
const {Op} = require('sequelize');

module.exports.search = (req, res, next)=>{
  let name = req.query.name;

  try {
    User.findAll({
      where: {
        user_id: {
          [Op.like]: `%${name}%`
        }
      }
    }).then(result => {
      return res.status(200).json(result).end();
    }).catch(err => {
      return res.status(500).json({
        message: 'Search failed'
      }).end();
    })
  } catch (error) {
    res.status(500).json({
      message: 'Search failed'
    }).end();
  }
}