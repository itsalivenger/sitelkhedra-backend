// ////////////////////// bonk ///////////////////
let express = require('express');
let app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const signup = require('./routes/signup.js');
const login = require('./routes/login.js');
const profile = require('./routes/profile.js');
const cartel = require('./routes/cartel.js');
const products = require('./routes/products.js');
const logout = require('./routes/logout.js');
const authRoute = require('./routes/auth.js');

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
    Headers: { "Access-Control-Allow-Origin": "http://localhost:3000"},
   origin:'http://127.0.0.1:5500',
   credentials:true,
   optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
/////////////////////////////////




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
