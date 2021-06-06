const Notification = require('../models/notification.model');

module.exports.getNotifications = async(req, res, next)=>{
    try{
        let user_id = req.userData.user_id;
        let notifications = await Notification.findAll({
            where:{
                user_id: user_id
            },
            order:[["timestamp", "DESC"]]
        });
        res.status(200).json(notifications).end();
    }catch(error){
        res.status(500).json({
            message: "Get notifications failed"
        }).end();
    }
}