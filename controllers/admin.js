/**
 * Section: Imports
 *      Custom imports required for this code section
 */

const Product = require('../Models/product');


/**
 * Section: get controllers 
 *      The get request handles for the routing
 */
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: 'admin/add-product',
      editing: false
    });
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  })
  .catch(err => console.log(err));
  
    
}

exports.getEditProduct = (req, res, next) => {
  // you can use query parameters located within the URL to pass additional data to the controller 
  // these parameters exist within the request query object as denoted below 
  const editmode = req.query.edit;
  if(!editmode){
    return res.redirect('/')
  }
  // if this is going to edit a product we get the product using a call back 
  // then within thatr callback we render the page 
  const prodId = req.params.productId;
  Product.findByPk(prodId) 
  .then(product => {
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'edit Product',
      path: 'admin/edit-product',
      editing: editmode, 
      product: product 
    });

  }).catch(err => {console.log(err)})
 
};

/**
 * Section: Post request 
 *      The post request section of the code base
 */

exports.postAddProduct = (req, res, next)=>{ 
  const title = req.body.title; 
  const imgUrl = req.body.imgUrl; 
  const price = req.body.price; 
  const desc = req.body.desc;
  req.user.createProduct({
    title: title, 
    price: price, 
    imageURL: imgUrl,
    description: desc

  }).then(result => {
    console.log('Created product')
    res.redirect('/admin/products')
  }).catch(err =>{console.log(err)})
  
  
}

// this is the post request for updating products
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId; 
  const title = req.body.title; 
  const imgUrl = req.body.imgUrl; 
  const price = req.body.price; 
  const desc = req.body.desc;
  const product = new Product(prodId, title,imgUrl,desc,price);
  Product.findByPk(prodId)
  .then((product)=>{
    product.title = title; 
    product.imageURL = imgUrl 
    product.price = price  
    product.description = desc
    return product.save();
    })
    .then(result => {
      console.log('updated product')
      res.redirect('/admin/products')
    }).catch(err => console.log(err));
    
  
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productID; 
  Product.findByPk(prodId)
  .then(product =>{
    return product.destroy();
  }).then(result => {
    console.log('Destroyed'); 
    res.redirect('/admin/products');
  }).catch(err => {console.log(err)});
  



}


