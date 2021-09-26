let jwt = require('jsonwebtoken');

let createToken = (id)=>{
    // it takes in an argument id, secret and some params object like expiration date
    return jwt.sign({ id }, 'spons', {
        expiresIn: 3600 // in seconds
    });
}
module.exports = createToken;