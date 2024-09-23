require('./db/conn');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
// const Register = require('./models/registerUser');
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static path
const staticPath = path.join(__dirname, '../public');
const dynamicPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');


app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', dynamicPath);
hbs.registerPartials(partialPath); 
// Dynamic path

console.log(staticPath);

app.get('/', (req, res) => {
    res.render('login');
    // res.send('Bis');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});