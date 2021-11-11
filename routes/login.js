let router = require('express').Router();
let bcrypt = require('bcrypt');
const {User, userSchema} = require("../models/users.js");
const createToken = require('../jwt/jwtGen.js');

router.post('/', (req, res)=>{
    let { email, password} = req.body;
    User.findOne({ email }).then((found)=>{
        let user = found;
        if(user){
            bcrypt.compare(password, found.password).then((matches)=>{
                if(matches){
                    res.cookie('jwt', createToken(found._id), {secure: true, sameSite: "none"});
                    res.cookie('user', user, {secure: true, sameSite: "none"});
                    console.log('user found');
                    res.status(201).send("Cookie Set");
                }else{
                    res.status(404).send({errMsg: 'Wrong credentials'});
                }
            });
        }else{
            res.status(404).send({errMsg: 'Wrong credentials'});
        }
    })
})

module.exports = router;    