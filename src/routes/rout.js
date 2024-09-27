const exress = require('express');
const rout = exress.Router();
const Register = require('../models/registerUser');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

rout.get('/', async (req, res) => {
    try {
        res.render('register');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

rout.post('/register', async (req, res) => {
    try {
        const user = new Register({
            email: req.body.email,
            password: req.body.pswd
        });

        const token = await user.generateAuthToken();
        console.log(token);

        res.cookie('jwt_token', token);

        const newUser = await user.save();
        console.log(newUser);

        res.status(201).render('login');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

rout.post('/login', async (req, res) => {
    try {
        const email  = req.body.email;
        const password = req.body.pswd;

        const user = await Register.findOne({ email: email });
        const pas = await bcrypt.compare(password, user.password);

        const token = await user.generateAuthToken();

        res.cookie('login_cookie', token);

        if(pas){
            res.status(201).render('home');
        }
        else{
            res.status(401).json({ message: 'Invalid Password!' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

rout.get('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((indexElement)=>{
            return indexElement.token !== req.token;
        });

        res.clearCookie('login_cookie');
        await req.user.save();
        console.log("Logout Successfully");

        res.status(201).render('login');
    }catch (error) {
        console.log(error.message);
    }
});

module.exports = rout;