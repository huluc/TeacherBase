var express = require("express");
var router = express.Router();

var Author = require('../models/author')
var user = require("./userService")


router.post("/add", (req, res) => {
    var author = new Author(req.body);
    author.save((err, author) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: err })
        }
        else{
            return res.sendStatus(201);
        }
    })
})

router.get("/list",user.checkAuthenticated,async(req,res)=>{
    let authors= await Author.find({},'-__v -_id')
    res.send(authors)
})

var author= {router}

module.exports=author;