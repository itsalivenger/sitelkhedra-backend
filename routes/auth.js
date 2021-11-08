let route = require('express').Router();
let authCheck = require('../jwtCheckMiddleWare/jwtCheck.js');

route.get('/', authCheck);

module.exports = route;