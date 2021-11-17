let router = require('express').Router();
let { Product } = require('../models/products.js');
let { User } = require('../models/users.js');
const authCheck = require('../jwtCheckMiddleWare/jwtCheck.js');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

//////////////// 2-profile page hanlder //////////////
router.get('/', authCheck, (req, res)=> {
    console.log('requested profile page');
})

router.post('/profileInfo', (req, res)=> {
    let { newFullname, newPhoneNumber, currentEmail } = req.body;
    User.findOneAndUpdate({ email: currentEmail }, {$set: {fullname: newFullname, phoneNumber: newPhoneNumber}})
    .then(ele=> res.send({msg: ele}))
    .catch(err=> console.log('this is an error', err));
})

router.put('/security', async (req, res)=> {
    let { email, password, password2 } = req.body;
    let msg = [];
    if(password2.length >= 8 && password2.length <= 30){
        let user = await User.findOne({ email });
        let areMatched = await bcrypt.compare(password, user.password);
        if(areMatched){
            let salt = await bcrypt.genSalt();
            let hashedPass = await bcrypt.hash(password2, salt);
            await User.findOneAndUpdate({ email }, {$set: { password: hashedPass }});
            msg.push(['success', 'password updated successefully']);
        }else{
            msg.push(['err', 'password is incorrect']);
        }
    }else{
        msg.push(['err', 'password is too short']);
    }
    res.send({ msg });
})


router.get('/displayItems', (req, res)=>{
    jwt.verify(req.cookies.jwt, 'spons', async (err, decodedToken)=>{
        if(err){
            res.send(err);
        }else{
            let currentUser = await User.findById(decodedToken.id);
            if(currentUser.isAdmin){
                Product.find()  
                .then(items=> res.send(items));
            }
        }
    });
})

router.get('/manageItems', authCheck, (req, res)=>{
    console.log('verified');
})

router.post('/manageItems', (req, res)=>{
    let { name, price, quantity, type, quantityBy, qty } = req.body;
    jwt.verify(req.cookies.jwt, "spons", async (err, decodedToken)=>{
        if(err){
            res.send(err);
        }else{
            let currentUser = await User.findById(decodedToken);
            if(currentUSer.isAdmin){

                Product.findOne({name})
                .then((isFound)=>{
                    if(!isFound){
                        Product.create({type, name, price, quantity, quantityBy, qty})
                        .then((createdItem)=>{
                            console.log('item added successfully', createdItem);
                            res.send({msg: 'item added'});
                        })
                        .catch(err=> console.log('error in creating product item', err));
                    }else{
                        Product.findOneAndReplace({name}, {type, name, price, quantity, quantityBy, qty})
                        .then((updatedItem)=> res.send({msg: 'item updated'}))
                        .catch(err=> console.log('error in updating', err));
                    }
                })
                
            }
        }
    })
})


router.delete('/:name', (req, res)=>{
    Product.findOneAndDelete(req.params.name)
    .then((res)=> console.log('deleted'));
})


module.exports = router;