let user = require('../models/user.model');

module.exports.search = async(req, res)=>{
    let name = req.query.name;
    try {
        const { count, rows } = await Project.findAndCountAll({
            where: {
              title: {
                [Op.like]: `%${name}%`
              }
            },
            offset: 10,
            limit: 2
        });
        console.log(count);
        console.log(rows);
    } catch (error) {
        console.error(error);
    }
}