const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');

const Product = require('./backend/productsSchema')

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

app.get('/', (req, res) => {
    res.send('Welcome to Shop Backend');
});

app.post('/productlist', async(req, res) => {

        try{
            const data = req.body;
            const productData = Product(data);
            
            const saveData = await productData.save();

            console.log('new data added');

            res.status(500).json(saveData);
        }
        catch(err){
            console.log(err);
            res.status(500).json({error : 'Internal server error'});
        }
});

app.get('/productlist', async(req, res) => {

        try{
            const data = await Product.find();
            console.log('data fetched');
            res.status(200).json(data);
        }
        catch(err){
            console.log(err);
            res.status(500).json({error : 'Internal server error'});
        }
});

app.put('/productlist/:id', async(req, res) => {

        try{

            const productID = req.params.id;
            const dataToUpdate = req.body;

            const newData = await Product.findByIdAndUpdate(productID, dataToUpdate);

            if(!newData){
                res.status(404).json('Invalid product');
            }

            console.log('data updated');
            res.status(200).json(newData);
        }
        catch(err){

            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        }
});

app.delete('/productlist/:id', async(req, res) => {

        try{

            const productID = req.params.id;
            const response = await Product.findByIdAndDelete(productID);
            if(!response){
                res.status(404).json('Invalid product');
            }

            console.log('data deleted');
            res.status(200).json(response);

        }
        catch(err){

            console.log(err);
            res.status(500).json({error : 'Internal server error'});
        }

});

app.listen(3003, () => {
    console.log('Server is running on port 3003');
});
