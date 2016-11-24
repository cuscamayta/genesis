var models = require('./../models');
var express = require('express');
var router = express.Router();
var common = require('./common');
var jwt = require("jsonwebtoken");

router.post('/authenticate', function(req, res) {
    models.User.findOne({
        include: [{ model: models.Role }],
        where: { username: req.body.username, password: req.body.password }
    }).then(function(user) {
        if (user) {
            res.json({
                type: true,
                data: user.dataValues
            });
        } else {
            res.json({
                type: false,
                data: "Usuario o contraseña incorretos"
            });
        }
    }).catch(function(err) {
        res.json({
            type: false,
            data: "Error : " + err
        });
    });
});

router.post('/changepass', common.isAuthenticate, function(req, res) {
    models.User.update({ password: req.body.passnew },
        {
            where: { username: req.body.username, password: req.body.passcurrent }
        }).then(function(user) {
            if (user) {
                res.json({
                    type: true,
                    data: "Se actualizo correctamente"
                });
            } else {
                res.json({
                    type: false,
                    data: "Usuario o contraseña incorretos"
                });
            }
        }).catch(function(err) {
            res.json({
                type: false,
                data: "Error : " + err
            });
        });
});

module.exports = router;