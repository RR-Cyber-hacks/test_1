require('dotenv').config();
const express = require('express');
const app = express();
require('./db/conn');
const path = require('path');
const port = process.env.PORT || 4000;
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const rout = require('./routes/rout');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(rout);


// Static path
const staticPath = path.join(__dirname, '../public');
const dynamicPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');


hbs.registerPartials(partialPath);

app.use(express.static(staticPath));

app.set('view engine', 'hbs');
app.set('views', dynamicPath);
// Dynamic path



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});