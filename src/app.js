require('./db/conn');
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static path
const staticPath = path.join(__dirname, '../public');
app.use(express.static(staticPath));

console.log(staticPath);

app.get('/', (req, res) => {
    // res.render('index.html');
    res.send('Bis');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});