const express = require('express');
const router = express.Router();
const Cart = require('./../backend/cartSchema');

router.get('/', async(req, res) =>{
    try{
        const data = await Cart.find();
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
        const productData = Cart(data);
        
        const saveData = await productData.save();

        console.log('new data added');

        res.status(200).json(saveData);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
});

router.put('/:productId/quantity', async(req, res) => {

    try{

        const productID = req.params.productId;
        const dataToUpdate = req.body;

        const newData = await Cart.updateOne({productId: productID}, dataToUpdate);

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

router.put('/:productId/delivery', async(req, res) => {

    try{

        const productID = req.params.productId;
        const dataToUpdate = req.body;

        const newData = await Cart.updateOne({productId: productID}, dataToUpdate);

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

//to delete the cart item completely
router.delete('/:productId', async(req, res) => {

    try{

        const productID = req.params.productId;
        const response = await Cart.deleteOne({productId: productID});

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