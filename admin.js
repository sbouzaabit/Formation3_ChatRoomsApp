/**
 * Created by Said B on 04/05/2017.
 */

var uuid= require("node-uuid");
var _= require("lodash");
//recupere data
var roomsData= require("./data/rooms.json");

var express = require ("express");
var adminRouter = express.Router();
module.exports = adminRouter;



adminRouter.use(function (req,res,next){
    if (req.user.admin){
        next();
        return;
    }
    res.redirect("/login");
})


adminRouter.get('/rooms', function (req, res) {
        res.render("rooms", {
            title: "Rooms page",
            rooms: roomsData
        });
        //fs.send('Hello worlds from nodeJs Server');
    });

adminRouter.route('/rooms/add')
    .get( function (req, res) {
    res.render("add");
})
    .post( function (req, res) {
        var room = {
            name: req.body.name,
            id: uuid.v4()
        };
        roomsData.push(room);
        /*    res.send("nothing");
         res.render("add" );*/
        //res.json(room);
        res.redirect(req.baseUrl+ "/rooms");//res.redirect(./); relative path
    });

adminRouter.get('/rooms/delete/:id', function (req, res) {
        var roomId = req.params.id;
        roomsData = roomsData.filter(r => r.id !== roomId);
        //res.send(roomId);
        res.redirect(req.baseUrl+ "/rooms");
    });


adminRouter.route('/rooms/edit/:id')
    .all (function (req,res,next){
        var roomId = req.params.id;
        var room = _.find(roomsData, r => r.id === roomId);
        if (!room) {
            //next("somthings went wrong")
            //next(new Error("Oh no"))
            res.sendStatus(404);
            return;
        }
        res.locals.room=room;
        next()
    })
    .get(function (req, res) {
        res.render("edit");
    })
    .post( function (req, res) {
        res.locals.room.name = req.body.name;
        res.redirect(req.baseUrl + "/rooms");
    });

