let jwt = require('jsonwebtoken');

let middleware = (req, res, next)=> {
    let token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'spons', (err, encodedToken)=>{
            if(err){
                console.log(err);
                res.send({approved: false, url: '/login'});
            }else{
                res.send({approved: true});
                next();
            }
        })
    }else{
        res.send({approved: false, url: '/login'});
    }
}
module.exports = middleware;