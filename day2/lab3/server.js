var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000);

var session = require('express-session');
var bodyParser = require('body-parser');

app.get("/notes", function(req,res) {
    var notes = [
        {text: "First note"},
        {text: "Second note"},
        {text: "Third note"}
    ];
    res.send(notes);
});