let jwt = require('jsonwebtoken');
let { User } = require('../models/users.js');

let middleware = (req, res, next)=> {
    let token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'spons', async (err, decodedToken)=>{
            if(err){
                console.log(err);
                res.send({approved: false, err});
            }else{
                let currentUser = await User.findById(decodedToken.id);
                
                res.send({approved: true, currentUser});
                next();
            }
        })
    }else{
        console.log(req.cookies);
        res.send({approved: false, err: `token was not found ${token}`});
    }
}
module.exports = middleware;