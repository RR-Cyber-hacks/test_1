 const express = require('express');
 const app = express();
 const port = process.env.PORT || 4000;


 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 
 app.use(express.static('public'));

 app.get('/', (req, res) => {
    res.send('Welcome');
 });

 app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
 });