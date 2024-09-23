require('./db/conn');
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static path
const staticPath = path.join(__dirname, '../public');
const dynamicPath = path.join(__dirname, '../templates/views');


app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', dynamicPath);


// Dynamic path

console.log(staticPath);

app.get('/', (req, res) => {
    res.render('index');
    // res.send('Bis');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});