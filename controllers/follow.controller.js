const Follow = require('../models/follow.model');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const sequelize = require('../models/db');
const { QueryTypes } = require('sequelize');

module.exports.follow = async (req, res, next) => {
    try {
        let user_id = req.userData.user_id;
        let id_follow = req.params.id;
        let user = await User.findByPk(id_follow);
        let follow = await Follow.findAll({
            attributes:["following_id", "follower_id"],
            where: {
                follower_id: user_id,
                following_id: id_follow
            }
        });
        if(follow.length > 0){
            res.status(500).json({
                message: "Already follow"
            }).end();
        }else{
            await sequelize.query(`INSERT INTO follow(following_id, follower_id) VALUES ("${id_follow}", "${user_id}")`, {type: QueryTypes.INSERT});
            let user = await User.findByPk(id_follow);
            let num_followers = user.followers + 1;
            await User.update({followers: num_followers}, {
                where: {
                    user_id: id_follow
                }
            })
            console.log(num_followers);
            res.status(201).json({
                num_followers: num_followers
            }).end();
        }
    } catch (error) {
        return res.status(500).json({
            message: 'follow failed'
        }).end();
    }
}

module.exports.unfollow = (req, res, next) => {
    try {
        let user_id = req.userData.user_id;
        let id_follow = req.params.id;
        User.findAll({
            where: {
                user_id: id_follow
            }
        }).then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: '404 Not found user'
                }).end();
            }
            console.log(user);
            return Follow.findAll({
                attributes: ["following_id", "follower_id"],
                where: {
                    following_id: id_follow,
                    follower_id: user_id
                }
            })
        }).then(result => {
            if (result.length < 1) {
                return res.status(500).json({
                    message: 'User followed this person yet'
                }).end();
            }
            Follow.destroy({
                where: {
                    following_id: id_follow,
                    follower_id: user_id
                }
            }).then(result => {
                User.findByPk(id_follow).then(user =>{
                    let num_followers = user.followers - 1;
                    User.update({followers: num_followers}, {
                        where: {
                            user_id: id_follow
                        }
                    }).then(success =>{
                        return res.status(200).json({
                            num_followers: num_followers
                        }).end();
                    })
                })
            })
        }).catch(error => {
            res.status(500).json({
                message: 'failed'
            }).end();
        })
    } catch (error) {
        return res.status(500).json({
            message: 'unfollow failed'
        }).end();
    }
}