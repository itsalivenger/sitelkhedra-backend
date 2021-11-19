let router = require('express').Router();
let bcrypt = require('bcrypt');
const { User } = require("../models/users.js");
const createToken = require('../jwt/jwtGen.js');

router.post('/', async (req, res)=>{
    let { email, password} = req.body;
    let found = await User.findOne({ email });
    if(found){
        let matches = await bcrypt.compare(password, found.password)
        if(matches){
            res.cookie('jwt', createToken(found._id), {secure: true, sameSite: "none"});
            console.log('user found');
            res.status(201).send("Cookie Set");
        }else{
            res.status(404).send({errMsg: 'Wrong credentials'});
        }
    }else{
        res.status(404).send({errMsg: 'Wrong credentials'});
    }
})

module.exports = router;    