const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../model/user')
const alert = require('alert');


router.post("/register", async (req, res) => {
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    User.findOne({ username: req.body.username }, async (err, user) => {
        if(err) console.log(err)
        if(user) res.send("User already exists")

        if(!user) {
            const newUser = new User({
                username: req.body.username,
                nickname: req.body.nickname,
                password: hashedPassword,
            })

            await newUser.save()
            console.log(newUser)
            res.send("User created")
        }
    })
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        console.log("incorrect password");
        console.log(user)  
       
        console.log(info)  
      if (err) throw err
      if (!user)
      {
          res.send(null) 
      }
      else {
        req.logIn(user, (err) => {
          if (err) throw err
          res.json(req.user)
          console.log(req.user)
        })
      }
    })(req, res, next)
  })


router.get("/user", (req, res) => {
    //console.log(req.user)
    if(req.user) {
        res.json(req.user)
    } else {
        res.send(null)
    }
});

router.get("/logout", (req, res) => {
    req.logout()
    res.status(200).end("Logged out successfully")
})

module.exports = router