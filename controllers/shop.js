/**
 * Section: imports
 *    Section to get the imports required for this portion of the code base
 */
const Product = require('../Models/product');
const Cart = require('../Models/cart');

/**
 * Section: Get logic 
 *   Section to handle the get request logic for the shop website 
 *
 *  Note: 
 *    Sequelize findall has some configuration features that allow you to customize how you use it 
 *     more information on that at: http://docs.sequelizejs.com/
 */

 exports.getProduct = (req, res, next) => {
  // products fetchall method is called with the anonymous function 
  // when fetch all is done it then executes the anonymous function 
  // when using promises you utilize a then clause with 
  Product.findAll()
  .then((products) => {
    res.render('Shop/Product-list', {
      prods: products,
      pageTitle: 'All products',
      path: '/Products-list',
    })
  })
  .catch(err => console.log(err));
  };

  exports.getSingleProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then((product) => {
      res.render('Shop/product-detail', {
           product: product, 
           pageTitle: product.title,
           path:'/products'
       })

  })
  .catch(err => { console.log(err)})
  
  };


  exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then((products) => {
    res.render('Shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      });
  })
  .catch(err => console.log(err));
  }

  exports.getCart = (req, res, next) => {  
    req.user
    .getCart().then(cart => {
      return cart.getProducts()
      .then(products => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your cart' , 
          products: products
        })
      }).catch(err => {console.log(err)})


    }).catch(err => {console.log(err)})
  }

  exports.getCheckout = (req, res, next) => {
    res.render('admin/products', {
      path: '/admin/products', 
      pageTitle: 'Admin products'
    })
  } 

  
  exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders' 

    })
  }

  /**
   * Section: post request section
   *      The logic to handle the post request for the shop section of the website
   */

  exports.postCart = (req, res, next)=> {
    const prodId = req.body.productId;
    let fetchedCart; 
    let newQuantity = 1;
    req.user
    .getCart() 
    .then(cart => {
      fetchedCart = cart;
      return cart
      .getProducts({where: {id: prodId}})

    })
    .then(products => {
      let product;
      if(products.length > 0){
        product = products[0];
      }
      if(product){
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1; 
        return product;
       

      } 
      return Product.findByPk(prodId)
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through:{ quantity: newQuantity }
      })
    })
    .then(() => {res.redirect('/cart')})
    .catch(err => {console.log(err)})
    
  } 

  exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart()
    .then(cart => {
      return cart.getProducts({where: {id: prodId}})
    })
    .then(products => {
      const product = products[0] 
      return product.cartItem.destroy();
    })
    .then(()=>{
      res.redirect('/cart')
    }).catch(err => {console.log(err)})
  }
  
  





  /**
 * Section: Old Code
 *      Section for previously used code saved for later reference
 */

// exports.getCart = (req, res, next) => { 
//   Cart.getCart(cart => {
//     Product.fetchAll(products => {
//       const cartProducts = []
//       for(product of products){
//         const cartProductData = cart.products.find(prod => prod.id === product.id)
//         if(cartProductData){
//           cartProducts.push({productData: product, qty:cartProductData.qty});

//         }
//       }
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your cart' , 
//         products: cartProducts
//       })

//     })
//   }) 
// }

// exports.postCart = (req, res, next)=> {
//   const prodId = req.body.productId;
//   Product.findById(prodId, product => {
//     Cart.addProduct(prodId, product.price)
//   })
//   res.redirect('/cart')
// } 

