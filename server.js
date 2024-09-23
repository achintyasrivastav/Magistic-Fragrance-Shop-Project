const express = require('express');
const app = express();
const db = require('./db');

require('dotenv').config();
const PORT = process.env.PORT || 3003;

const bodyParser = require('body-parser');
const cors = require('cors');


//import routers
const productRoutes = require('./routes/AllProductsRoutes');
const cartItemRoutes = require('./routes/CartItemRoutes');


// Middleware
app.use(cors()); 
app.use(bodyParser.json());


app.get('/', function (req, res){
    res.send('Welcome to Shop Backend');
});

//using product router
app.use('/productlist', productRoutes);
app.use('/cartlist', cartItemRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port 3003');
});
