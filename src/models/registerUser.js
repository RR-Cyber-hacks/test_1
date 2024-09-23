const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchemata = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    department: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    salary: {
        type: Number,
        required: true,
        min: 1000,
        max: 100000
    },
    startDate: {
        type: Date,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true, 
        validators: [
            validator.isEmail(), 
            { message: 'Please enter a valid email address.' }
        ],
        // match: /^\w+([\.-]?\w+)*@ \w+([\.-]?\w+)*(\.\w{2,3})+$/
    }
});


// Create Collections


const Register = new mongoose.model('Register', employeeSchemata);

module.exports = Register; 