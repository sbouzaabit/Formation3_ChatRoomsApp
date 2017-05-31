/**
 * Created by Said B on 05/05/2017.
 */
var users = require("./data//users.json");
var express = require("express");
var router = express.Router();
module.exports = router;

var _= require("lodash");
//authentification
var passport= require("passport");

router.get('/login', function (req,res){
   /* if(req.app.get("env") === "development"){
        var user = users[0];
        if(req.query.user){
            user = _.find(users, u => u.name === req.query.user)
        }
        req.logIn(user, function (err){
            if(err){
                return next(err);
            }
            return res.redirect('/');
        });
        return;
    }*/
    res.render("login");
})

router.post('/login', passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/login'
    })
)

router.get('/logout', function (req,res){
    req.logout();
    res.redirect('login');
    })
