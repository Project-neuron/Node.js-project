/**
 * Instead of using our own custom logic to handle the Product class 
 * We will marry our product object with our database to further abstract away the underlying 
 * mechanisms that govern them, allowing us to simply focus on our project
 */
const Sequelize = require('sequelize'); 
const sequelize = require('../Utils/database'); 

const Product = sequelize.define('product', {
    id:{ 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        allowNull: false, 
        primaryKey: true
    }, 
    title: Sequelize.STRING, 
    price:{
        type: Sequelize.DOUBLE, 
        allowNull: false

    },
    imageURL:{
        type: Sequelize.STRING, 
        allowNull: false

    }, 
    description:{
        type:Sequelize.STRING, 
        allowNull: false
    } 
});

module.exports = Product;






























// old code 
// // core imports for local files storage
// // const fs = require('fs'); 
// // const path = require('path');
// const db = require('../Utils/database')

// // custom imports 
// // const rootDir = require('../Utils/path');
// const cart = require('./cart')



// // using a javascript class definition 
// module.exports = class Product{
//     constructor(id, title, imgUrl, desc, price){
//         this.id = id
//         this.title  = title; 
//         this.imgUrl = imgUrl; 
//         this.desc = desc; 
//         this.price = price;    

//     }

//     // save a product 
//     save(){
//      return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', 
//         [this.title, this.price, this.imgUrl, this.desc]
//      );  
//     }
    
    

//     // delete a product 
//     static deleteById(id){}



    
//     // get all products returns a promise object with the information to be parsed and used in the 
//     // funcion that is calling this one
//     static fetchAll(){
//         return db.execute('SELECT * FROM products');
//     }

    
//     static findById(id){
//         return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
        
//     }
    
// }






    // code to get a product using a file 
    // getProductsFromFile(products => {
    //     const product = products.find(prod => prod.id === id);
    //     const updatedProducts = products.filter(p => p.id !== id);
    //     fs.writeFile(productsPath,
    //         JSON.stringify(updatedProducts), err=>{
    //             if(!err){
    //                 cart.deleteProduct(id, product.price);

    //             }
    //         });
            
        
    // })

    
    // this function is asyncronous and is simple return statements are used then nothing will be returned 
    // and the result will be an undefined object 
    // in order to avoid this we have to register a call back function that will be called once the main function is done with it's 
    // execution 
    // getting a product from a file code 
    //    getProductsFromFile(products => {
    //         if(this.id){
    //             const existingProductIndex = products.findIndex(p => this.id === p.id)
    //             const updatedProducts = [...products]
    //             updatedProducts[existingProductIndex] = this
    //             fs.writeFile(productsPath,
    //                 JSON.stringify(updatedProducts), 
    //                 (err)=>{
    //                     console.log(err);
    //                 }
    //              );
    //         }else{
    //         this.id = Math.random().toString();
    //         products.push(this)
    //         fs.writeFile(productsPath,
    //             JSON.stringify(products), 
    //             (err)=>{
    //                 console.log(err);
    //             });
    //         }
    //     })

      // find by id using a file 
    // getProductsFromFile(products => {
    //     const product = products.find(p => p.id === id); 
    //     cb(product);
    // })

    // getting the path to the Product save directory 
// const productsPath = path.join(rootDir, 
//     'Data', 
//     'products.json'
// );

// helper functions 
// getting products from a file when using local files 
// const getProductsFromFile = cb => {
//     const productsPath = path.join(rootDir, 
//         'Data', 
//         'products.json'
//     );
//     fs.readFile(productsPath, 
//         (err, fileContents) =>{
//             if(err){
//                 cb([]);
//             }else{
//              cb(JSON.parse(fileContents));
//             }
//         }
//     );

// }
    