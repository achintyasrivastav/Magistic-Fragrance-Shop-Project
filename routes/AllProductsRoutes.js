const express = require('express');
const router = express.Router();
const Product = require('./../backend/productsSchema');

router.get('/', async(req, res) =>{
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

router.post('/', async(req, res) => {

    try{
        const data = req.body;
        const productData = Product(data);
        
        const saveData = await productData.save();

        console.log('new data added');

        res.status(200).json(saveData);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
});

router.put('/:id', async(req, res) => {

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

router.delete('/:id', async(req, res) => {

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

module.exports = router;