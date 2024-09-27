require('./db/conn');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
// const Register = require('./models/registerUser');
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static path
const staticPath = path.join(__dirname, '../public');
const dynamicPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');


app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', dynamicPath);
hbs.registerPartials(partialPath);
// Dynamic path

app.get('/', async (req, res) => {
    res.render('login');
    // res.send('Bis');
});

app.get('/register', async (req, res) => {
    try {
        res.render('register');
    } catch (e) {
        res.status(404).send('Invalid');
    }
});

app.get('/home', async (req, res) => {
    res.render('home');
    // res.send('Bis');
});

app.post('/home', async (req, res) => {
    try {
        console.log(req.body.username);
        res.send(req.body.username);
    }catch (e) {}
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});