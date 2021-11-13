const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    fullname: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    phoneNumber: {
        type : Number,
        required : true,
        unique : true,
        minlength: 9,
        maxlength: 10
    },
    password: {
        type : String,
        required : true,
        minlength : 8
    },
    cartel: {
        type : Array,
        required : true
    }
}, {timestamps: true})


//khas dir fih nom singulier  tlmodel f lparametre///////
const User = mongoose.model("user", userSchema);   
module.exports = { User, userSchema };