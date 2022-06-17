/*
 * Title:   Login System Advanced 
 * Author:     Sneh Jaiswal
 * Created On: Fri Jun 17 2022 10:56:17 am
 */

"use strict"

const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const LoginSchema = Schema({
    uniqueID: {
        type: String,
        require: true,
    },
    Name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    otp:"",
    expires:"",
    isVerifyed:Boolean,
    Role: {
        type: String,
        default: "Student"
    }    },
    {
        timestamps: true
    },


)
// LoginSchema.indexes();


// LoginSchema.createIndex(
//     { creationDate: 1 },
//     { expireAfterSeconds: 300, partialFilterExpression: { isVerifyed: { $eq: false } } },function(err, data){
//         console.log(err);
//         console.log(data);
//        });

// collection creation 
const LoginModel = model('LOGIN', LoginSchema, "User Login");





module.exports = LoginModel;

