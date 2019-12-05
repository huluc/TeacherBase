var express = require("express");
var router = express.Router();

var jwt = require("jwt-simple")

var User = require("../models/user")

router.post("/register", (req, res) => {
    let newUser = new User(req.body);
    newUser.save((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: err })
        }
        else {
            return res.status(201).send({ message: "User is saved!" });
        }
    })
})

router.post("/login", async (req, res) => {
    let userData = req.body;

    let user = await User.findOne({ email: userData.email })
    console.log(`USERRRR ${user}`)
    if (!user) {
        return res.status(401).send({ message: "Username or password invalid." })
    }
    if (userData.password !== user.password) {
        return res.status(401).send({ message: "Username or password invalid." })
    }
    let payload = {}
    let token = jwt.encode(payload, "xx")
    res.status(200).send({ token })
});
var user = {
    router, checkAuthenticated: (req, res, next) => {
        if (!req.header('authorization')) {
            return res.status(401).send({ message: "Unauthorized No authorization header!" })
        }

        var token = req.header("authorization").split(' ')[1]
        var payload = jwt.decode(token, "xx");
        if (!payload) {
            return res.status(401).send({ message: "Unauthorized. Token is invalid" })
        }
        next()
    }
}

module.exports = user;


