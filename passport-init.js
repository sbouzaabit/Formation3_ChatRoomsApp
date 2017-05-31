/**
 * Created by Said B on 05/05/2017.
 */
var passport = require("passport");
var LocalStrategy= require('passport-local').Strategy;
var users = require("./data//users.json");
var _ = require('lodash');


passport.use(new LocalStrategy(function(username,password, done){
    var user = _.find(users, u => u.name=== username);
    if (!user || user.password !== password){
        done(null, false);
        return;
    }
    done(null,user);
}));

//function for serialise user object
passport.serializeUser( function (user, done){
    done(null,user.id);
})

passport.deserializeUser( function (id, done){
    var user = _.find(users, u=> u.id === id);
    done(null,user);
})