var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');
var jwt = require("jsonwebtoken");


router.post('/authenticate', function (req, res) {
    models.User.findOne({ where: { username: req.body.username, password: req.body.password } }).then(function (user) {
        if (user) {
            res.json({
                type: true,
                data: user.dataValues
                // token: user.dataValues.token
            });
        } else {
            res.json({
                type: false,
                data: "Incorrect username/password"
            });
        }
    }).catch(function (err) {
        res.json({
            type: false,
            data: "Error occured: " + err
        });
    });
});

router.post('/signin', function (req, res) {
    models.User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User();
                userModel = req.body.username;
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.firstname = request.body.firstname;
                userModel.lastname = request.body.lastname;
                userModel.idrole = request.body.idrole;
                userModel.save(function (err, user) {
                    user.token = jwt.sign(user, process.env.JWT_SECRET);
                    user.save(function (err, user1) {
                        res.json({
                            type: true,
                            data: user1,
                            token: user1.token
                        });
                    });
                })
            }
        }
    });
});

router.get('/me', ensureAuthorized, function (req, res) {
    models.User.findOne({ token: req.token }, function (err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
});

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

module.exports = router;