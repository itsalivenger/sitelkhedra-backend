let router = require('express').Router();
let { Product } = require('../models/products.js');
const authCheck = require('../jwtCheckMiddleWare/jwtCheck.js');


//////////////// 2-profile page hanlder //////////////
router.get('/', authCheck, (req, res)=> {
    console.log('requested profile page');
})

router.get('/displayItems', (req, res)=>{
    Product.find()
    .then(items=> res.send(items));
})

router.get('/manageItems', authCheck, (req, res)=>{
    console.log('verified')
})

router.post('/manageItems', (req, res)=>{
    let { name, price, quantity, type, quantityBy } = req.body;

    Product.findOne({name})
    .then((isFound)=>{
        if(!isFound){
            Product.create({type, name, price, quantity, quantityBy})
            .then((createdItem)=>{
                console.log('item added successfully', createdItem);
            })
        }else{
            Product.findOneAndReplace({name}, {type, name, price, quantity, quantityBy})
            .then((updatedItem)=> console.log('item updated', updatedItem))
        }
    })
})


router.delete('/:name', (req, res)=>{
    Product.findOneAndDelete(req.params.name)
    .then((res)=> console.log('deleted'));
})


module.exports = router;