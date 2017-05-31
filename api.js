/**
 * Created by Said B on 04/05/2017.
 */

var express = require("express");
var roomsData= require("./data/rooms.json");
var messagesData= require("./data/messages.json");
var users = require("./data//users.json");
var uuid= require("node-uuid");
var router = express.Router();
module.exports = router;

var _= require("lodash");


router.get("/rooms", function (req, res){
    //var rooms =roomsData;
    //res.render("home",{rooms});
    res.json(roomsData);
});

router.route("/rooms/:idRoom/messages").get(function (req, res){

    var roomId = req.params.idRoom;
    var roomMessages = messagesData.filter(m => m.roomId === roomId) //recuperer les messages par roomId
        .map( m => {
            var user = _.find(users, u => u.id === m.userId);//pour recuperer lutilisateur et ses messages
            return { text: `${user.name} :  ${m.text}`};
        });

    var room = _.find(roomsData, r => r.id === roomId); //recuperer le nom de la Room

    //gestion erreur;
    if (!roomMessages) {
        res.sendStatus(404);
        return;
    }
    res.json({
        room : room,
        messages : roomMessages
    });
})
.post(function ( req, res){
    var roomId = req.params.idRoom;
    var message = {
        roomId: roomId,
        text : req.body.text,
        userId : req.user.id ,
        id : uuid.v4()
    }
    messagesData.push(message);
    res.sendStatus(200)/*.json({
        //messages : messagesData
    });
*/

})
.delete(function ( req, res){
    var roomId = req.params.idRoom;
    messagesData = messagesData.filter( m => m.roomId !== roomId );
    res.sendStatus(200)
})