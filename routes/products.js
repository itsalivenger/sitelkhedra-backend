let router = require('express').Router();
let mongoose = require('mongoose');
let { Product } = require('../models/products.js');
let { User } = require('../models/users.js');

router.get("/",(req,res)=>{
    Product.find()
    .then((productsInDb)=> res.send([...productsInDb]))
})

router.post('/', (req, res)=>{
    //btw the user property is just the user email fetched from the cookies in the front end
    let { user, cart } = req.body;
    if(user){
        //the $set property means that you only want to update a property in your document
        User.findOneAndUpdate({email: user}, { $set: { cartel: cart }}, { returnNewDocument: true })
        .then((newItem)=>{
            console.log('new item', newItem);
            res.send({msg: 'item added'});
        })
    }else{
        res.send({msg: 'there was an error'});
    }
})

module.exports = router;