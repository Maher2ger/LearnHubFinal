const express = require("express");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

module.exports = router;

router.post('/login', (req, res) => {
        User.findOne({   //search for the user email address in the database
            email: req.body.email,
        })
            .then(
                user => {
                    if (!user) {    //if the user not found
                        return res.status(401).json({
                            //return error
                            message: 'email not found in the database!'
                        })
                    }

                    //if the user found
                    return bcrypt.compare(req.body.password, user.password)  //compare the password in the db with the given password
                        .then(result => {
                            if (result) {  //if we the result equal to true, then the given password is correct
                                //create the token
                                const token = jwt.sign({
                                        email: user.email,
                                        userId: user._id
                                    },"secret_this_should_be_longer"
                                    , {
                                        expiresIn: "1h",
                                    }
                                )
                                //send the token back to the client
                                res.status(200).json({
                                    message: 'jwt token created successfully',
                                    token: token,
                                    expiresIn: 3600,
                                    userId: user._id,
                                    userName: user.name
                                })
                            } else {
                                res.status(500).json({
                                    message: "password is wrong!"
                                })
                            }
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: "Auth faild!",
                                error: err.message
                            })
                        })
                }
            )
    }
)

router.post("/signup", (req, res) => {
    User.findOne({   //search for the user email address in the database
        email: req.body.email,
    }).then(user => {
        //check iff the email-adresse is already used
        if (!user) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        student_number:req.body.student_number,
                        password: hash,
                        role:"client"
                    });
                    user.save()
                        .then((result) => {
                            res.status(200).json({
                                message: 'User created successfully',
                                result: result
                            })
                        }).catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    });
                });

        } else {
            return res.status(401).json({
                //return error
                message: 'Email address is already registered'
            })
        }
    })


    }
)

