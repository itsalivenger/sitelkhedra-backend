let router = require('express').Router();
let mongoose = require('mongoose');
let { Product } = require('../models/products.js');

router.get("/",(req,res)=>{
    Product.find()
    .then((productsInDb)=> res.send([...productsInDb]))
})

module.exports = router;