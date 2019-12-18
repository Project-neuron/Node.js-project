const express = require('express');
const path = require('path');

/**
 * Express router can be used in the same way as an express use function
 * 
 * we use the node path operation to build relative paths that can work on any computer regardless of operating system
 * 
 */
const router = express.Router()


const shopController = require('../Controllers/shop')
// basic HTML get 
// router.get('/', (req, res, next)=>{
//     console.log(adminData.products);
//     res.sendFile(path.join(rootdir, 'Views', 'Shop.html'));
// })

// templated HTML get dynamically build the page utilizing the templating engine depicted 
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProduct);

router.post('/cart', shopController.postCart);

router.get('/cart', shopController.getCart);

// dynamic route utilizing a built in express feature that designates any url addition of information 
// after the colon 
router.get('/products/:productId', shopController.getSingleProduct)

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders);

router.post('/cart-delete-item', shopController.postDeleteCartItem);

module.exports = router;