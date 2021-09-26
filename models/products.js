let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    quantityBy : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    }
}, {timestamps : true});


const Product = mongoose.model('product', productSchema);

module.exports = {Product, productSchema}