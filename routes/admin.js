const express = require('express');
const path = require('path');



// path convinience function such that you don't need to worry about being in the right directory when adding urls 
// const rootdir = require('../Utils/path');

// router object used to manipulate the response and request objects from node 
const router = express.Router()

// When using static HTM: 
// admin route add product => GET
// router.get('/add-product', (req, res, next)=>{
//     res.sendFile(path.join(rootdir, 'Views', 'Add-Product.html'));
// });

const adminController = require('../Controllers/admin')

// using a templating engine 
// admin route add product => GET
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

// admin route add product 
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);
// when you have to export multiple things you use this the exports syntax 
// module.exports = router 
exports.routes = router;

