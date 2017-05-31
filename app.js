/**
 * Created by Said B on 02/05/2017.
 */
var express = require ("express");
var app = express();
//forparsing body request
var bodyParser= require("body-parser");


app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));

app.set("views", "./views");
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended : true}));
//app.use(bodyParser.json());

//debug
require('express-debug')(app,{}); // ou bien ajouter dans edit configuration de debugage DEBUG=express*
/*//log
var fs = require("fs");
var accessLogStream = fs.createWriteStream(__dirname+ '/access.log', {flags: 'a'})
app.use(require("morgan")("combined", {stream: accessLogStream}));*/

app.use(require("./logging.js"));

//authentification
var passport= require("passport");
//fichier init
require("./passport-init");

app.use(require('express-session')({
    secret : 'keyboard car', resave : false, saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); //optional


//own middlware
app.use(function(error, req, res, next){
    //console.log(`request comming from: " ${req.url}`);
    next();
});


var authRouter = require ("./auth");
app.use( authRouter);
//mettre avant les autre middlware pour empecher a aceder a la page admin sans authentification

app.use(function (req,res,next){
    if (req.isAuthenticated()){
        res.locals.user = req.user;
        next();
        return;
    }
    res.redirect("/login");
})

app.get('/', function (req, res,next) {
    res.render("home", { //index
        title: "Home page" //, function (error, html){
    });


    /*fs.readFile("./data/rooms.json", "utf8", function(error, data){
        if(error ) {
            next(error);
            return;
        }
        res.send(data);
    });*/
/*
    setTimeout( function (){

        try {
        throw new Error ( "noo");
        res.render("home", { //index
            title: "Home page" //, function (error, html){
        });
    } catch(error){
        next(error);
    }
    },1000);*/

    //fs.send('Hello worlds from nodeJs Server');
});





//faire appel aux differents routes, Ordre est important !! cela permet de proteger la route pour admin
var adminRouter = require("./admin");
//admin(app);
app.use("/admin", adminRouter);


var apiRouter = require ("./api");
app.use("/api", apiRouter);






app.listen(3000, function (){
    console.log ('listining from server port 3000');
});


/*var roomsData= require("./data/rooms.json");
var uuid= require("node-uuid");
var _= require("lodash");*/


/*
app.get('/', function ( req, res) {
    res.render("index" ,{ title :"Home page" //, function (error, html){
    });
    //fs.send('Hello worlds from nodeJs Server');
});

app.get('/admin/rooms', function ( req, res) {
    res.render("rooms", {
        title :"Rooms page",
        rooms : roomsData });
    //fs.send('Hello worlds from nodeJs Server');
});

app.get('/admin/rooms/add', function ( req, res) {
    res.render("add" );
});

app.post('/admin/rooms/add', function ( req, res) {
    var room ={
        name : req.body.name,
        id : uuid.v4()
    };
    roomsData.push(room);
    /!*    res.send("nothing");
     res.render("add" );*!/
    //res.json(room);
    res.redirect("/admin/rooms");
});

app.get('/admin/rooms/delete/:id', function ( req, res) {
    var roomId = req.params.id;
    roomsData = roomsData.filter ( r => r.id !== roomId);
    //res.send(roomId);
    res.redirect("/admin/rooms");
});

app.get('/admin/rooms/edit/:id', function ( req, res) {
    var roomId = req.params.id;
    var room = _.find ( roomsData, r => r.id === roomId);
    //res.send(roomId);
    if( ! room ){
        res.sendStatus(404);
        return;
    }
    res.render("edit",{room });
});


app.post('/admin/rooms/edit/:id', function ( req, res) {
    var roomId = req.params.id;
    var room = _.find ( roomsData, r => r.id === roomId);
    room.name=req.body.name;
    res.redirect("/admin/rooms");
});
*/
