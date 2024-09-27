const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});


employeeSchema.methods.generateAuthToken = async function () {
    try {
        const employee = this;
        const token = jwt.sign({ _id: employee._id.toString()}, process.env.SECRET_KEY, { expiresIn: '7d' });
        employee.tokens = employee.tokens.concat({token: token});
        await employee.save();
        return token;

    } catch (error) {
        console.error(error);
    }
}


employeeSchema.pre('save', async function (next) {
    const employee = this;
    if (employee.isModified('password')) {
        employee.password = await bcrypt.hash(employee.password, 10);
    }
    next();
});


// Create Collections
const Register = mongoose.model('Register', employeeSchema);

module.exports = Register; 