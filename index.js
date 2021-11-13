// ////////////////////// bonk ///////////////////
let express = require('express');
let app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5001;
const signup = require('./routes/signup.js');
const login = require('./routes/login.js');
const profile = require('./routes/profile.js');
const cartel = require('./routes/cartel.js');
const products = require('./routes/products.js');
const logout = require('./routes/logout.js');
const authRoute = require('./routes/auth.js');
//  'https://bazaar-wail-front.herokuapp.com' || 'http://localhost:3000';
const website = 'http://localhost:3000';
////////////// 2-db connection ///////////////////
const dbURL="mongodb+srv://user1:1234567890@site-lkhedra-cluster.bzoic.mongodb.net/site-lkhedra-db";
mongoose.connect(dbURL,{useNewUrlParser:true})
.then(result => app.listen(PORT, ()=>{
    console.log('listening to requesta');
}) ) 
.catch(err => console.log(err) );
////////////////////////////////////////////

/////////// 3-middlewares //////////////////////
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
const corsOptions ={
   origin: website,
   credentials: true,
   optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
/////////////////////////////////
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', website);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



                 ///////////////////////////////    4-Routes and Requests    /////////////////////////////////////////

app.use('/api/auth', authRoute);
// cartel //
app.use('/api/cartel', cartel);
// profile //
app.use('/api/profile', profile);
// login ///
app.use('/api/login', login);
// logout //
app.use('/api/logout', logout);
//sign up//
app.use('/api/signup', signup);
// products //
app.use('/api/Products', products);
