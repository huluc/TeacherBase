var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser')
var cors= require("cors")

var author = require('./services/authorService')
var user = require("./services/userService")

var app = new express();
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/author',author.router)
app.use("/user",user.router)

mongoose.connect("mongodb+srv://hilal:1234@teacherbase-igixq.mongodb.net/test?retryWrites=true&w=majority", (err) => {
    if (!err)
        console.log("Connected to database!!");
})

app.listen(8080);