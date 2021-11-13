let express = require('express');
let router = express.Router();
const {passwordChecker} = require('../inputHandlers/passwordHandler.js');
const { phoneChecker } = require('../inputHandlers/phoneNumberHandler.js');
const createToken = require('../jwt/jwtGen.js');
const { isEmail } = require('validator');
const {User, userSchema} = require("../models/users.js");
const bcrypt = require('bcrypt');

router.post("/", async (req, res)=>{
    let { fullname, phoneNumber, email, password, repeatedPass } = req.body;
    let emptyCheck = true;
    let errs = [];
    /////// input handling /////////
    passwordChecker(password, repeatedPass)[0] ? 0 : errs.push(passwordChecker(password, repeatedPass)[1]);
    isEmail(email) ? 0 : errs.push({errMsg : 'Email is not valid'});
    phoneChecker(phoneNumber)[0] ? 0 : errs.push(phoneChecker(phoneNumber)[1]);
    for (const input in req.body) {
        if(!req.body[input]){
            emptyCheck = false;
            errs.push({errMsg: "please fill all the inputs"});
        }
    }

    User.findOne({email})
    .then((user)=>{
        if(user){
            errs.push({errMsg: "User already exists"});
        }
        if(errs.length != 0){
            res.status(504).send(errs);
        }
        if(passwordChecker(password, repeatedPass)[0] && phoneChecker(phoneNumber)[0] && isEmail(email) && emptyCheck){
            bcrypt.genSalt()
            .then((salt)=> bcrypt.hash(password, salt))
            .then((hashedPass)=> User.create({fullname, email, phoneNumber, password: hashedPass, cartel: {}}))
            .then((result)=> {
                console.log('account created', result);
                res.cookie('jwt', createToken(result._id));
                res.status(201).json("Cookie Set");
            }).catch(err=> console.log(err));
        }
    })
        // 
})
module.exports = router;