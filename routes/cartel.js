let router = require('express').Router();
let {Product} = require('../models/products.js');


//   1-Cartel sector   //
router.get('/', (req, res)=>{
    Product.find((products)=>{
        res.send(products);
    })
    console.log('donde');
});

router.post("/",(req, res) => {
    console.log(req.body);
});

module.exports = router;