const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrybt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next)=>{
    User.findAll({
        where:{
            email: req.body.email
        }
    })
    .then(user=>{
        if(user.length >= 1){
            return res.status(409).json({
                error: "Mail exists"
            });
        }else{
            bcrybt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = User.build({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        class_id: req.body.class_id,
                        gender: req.body.gender,
                        birthday: new Date(req.body.birthday),
                        hometown: req.body.hometown,
                        status: req.body.sttus,
                        authority: req.body.authority,
                        username: req.body.username,
                        password: hash
                    });
                    user.save().then(result => {
                        res.status(201).json({
                            message: "User create"
                        });
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    })
});

router.post('/login', (req, res, next)=>{
    User.findAll({
        where: {
            email: req.body.email
        }
    })
    .then(user =>{
        if(user.length < 1){
            return res.status(404).json({
                message: "Auth Failed"
            });
        }else{
            bcrybt.compare(req.body.password, user[0].password, (err, result)=>{
                if(err){
                    return res.status(401).json({
                        message: "Auth Failed"
                    });
                }
                if(result){
                   const token = jwt.sign({
                        email: user[0].email,
                        user_id: user[0].user_id
                    }, "Tee_secret", {
                        expiresIn:"1h"
                    });
                    return res.status(200).json({
                        message: "Auth Successful",
                        token: token
                    })
                }
                return res.status(401).json({
                    message: "Auth Failed"
                });
            });
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});