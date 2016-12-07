var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000);

var session = require('express-session');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo/es5')(session);
var fs = require('fs');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var db = new Db('tutor',
    new Server("localhost", 27017, {safe: true},
        {auto_reconnect: true}, {}));
db.open(function(){
    console.log("mongo db is opened!");
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    store: new MongoStore({
        url: 'mongodb://localhost:27017/angular_session'
    }),
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

// app.get("/notes", function(req,res) {
//     res.send(req.session.notes||[]);
// });
app.get("/notes", function(req,res) {
    fs.readFile("notes.json", function(err, result) {
        if (result) {
            result = ""+result; // convert Object to String
            //remove last \n in file
            result = result.substring(0, result.length - 1);
            result = "["+result+"]";
            result = result.split("\n").join(",");
            res.send(result);
        } else {
            res.end();
        }
    });
});
//
// app.post("/notes", function(req, res) {
//     if (!req.session.notes) {
//         req.session.notes = [];
//         req.session.last_note_id = 0;
//     }
//     var note = req.body;
//     note.id = req.session.last_note_id;
//     req.session.last_note_id++;
//     req.session.notes.push(note);
//     res.end();
// });

app.post("/notes", function(req, res) {
    var note = req.body;
    var noteText = JSON.stringify(note)+"\n";
    fs.appendFile("notes.json", noteText, function(err) {
        if (err) console.log("something is wrong");
        res.end();
    });
});

app.delete("/notes", function(req,res) {
    var id = req.query.id;
    var notes = req.session.notes||[];
    var updatedNotesList = [];
    for (var i=0;i<notes.length;i++) {
        if (notes[i].id != id) {
            updatedNotesList.push(notes[i]);
        }
    }
    req.session.notes = updatedNotesList;
    res.end();
});

app.put("/notes", function(req,res) {
    var id = req.query.id;
    var notes = req.session.notes||[];
    var updatedNotesList = [];
    updatedNotesList.push(notes[id]);
    for (var i=0;i<notes.length;i++) {
        if (notes[i].id != id) {
            updatedNotesList.push(notes[i]);
        }
    }
    res.end();
});