/**
 *  core node imports
 *  express 
 */
// const http = require('http');

//third party imports
const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');

// custom imports 
// const routes = require('./routes')
const rootdir = require('./Utils/path');
const errorController = require('./Controllers/error');
const sequelize = require('./Utils/database');
const Product = require('./Models/product'); 
const User = require('./Models/user'); 
const Cart = require('./Models/cart'); 
const CartItem = require('./Models/cart-Item');
const Order = require('./Models/order'); 
const OrderItem = require('./Models/order-item'); 








/**
 * Section: Express methods
 *      Methods related to express that handle the routing for the application
 * 
 * Express function that will handle all of the asyncronous operations for me
 * Takes the usual request and response objects plus the next object
 * 
 * next: the next object is reponsible for passing the request to the next method within the middle ware  
 * When all the data has gone through all the middle ware and there is no more middle ware to be had then a response object 
 * Should be sent out thus completing a client server cycle
 * 
 * The first argument in the use function denotes specific url's so particular instances of use can be used to handle 
 * specific page requests and responses 
 * 
 * You should have the default page as the last use 
 * 
 * app.get:  same as app use but only fires if a get request is made
 * app.post: same as app use but only fires for post requests  
 */
 const app = express();

 // templating engine that will handle dynamic injection of data and html: pug ejs and express-handlebars are all 
 // auto registerd with express 
 // use express.set to create a global variable that the entire server can use or to make a setting 
 
 app.set('view engine', 'ejs');
 app.set('views', 'Views')
 
 // if your html files weren't in a views folder you would need to set another setting 
 // app.set('view', 'folder that has the html files name')


 // routes 
 const adminRoutes = require("./Routes/admin");
 const shopRoute = require("./Routes/shop");

// handling any request data from the client automatically calls next 
app.use(bodyParser.urlencoded({extended: false}))

// how to serve files statically using the express static method good for static resources css images etc for HTML 
app.use(express.static(path.join(__dirname,'Public')))

// you can store objects into request objects for use through out the application 
app.use((req, res, next)=>{
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();

    })
    .catch(err => {console.log(err)})
})

/**
 * Section: Routes  
 * Area where the overall routes are located
 */
    app.use('/admin',adminRoutes.routes);
    app.use(shopRoute);

    //catch all in case the route isn't found 
    app.use(errorController.get404);

/**
 * Section: Sequelize relations 
 * Area where the one to many, one to one etc is described
 */

   // has section 
        User.hasMany(Product);
        User.hasOne(Cart);
        User.hasMany(Order); 

    
    // belongs to 
        Product.belongsTo(User, {constraints: true, onDelete:'CASCADE'}); 
        Cart.belongsTo(User); 
        Cart.belongsToMany(Product, {through: CartItem})
        Product.belongsToMany(Cart, {through: CartItem})
        Order.belongsTo(User); 
        Order.belongsToMany(Product, {through: OrderItem})




/**
 * Section: Sequelize syncing 
 *     syncs all of the models outlined to the database 
 *     force is good for development and will force any changes to already made tables
 *     sequelize.sync({force: true})
 * Note: 
 *      when processing a promise with multiple steps it is often best to break up each step into it's own then clause 
 *      and also to make sure you return the resulting promise to the next then block. 
 *      If a promise ends with something that isn't a promise then you can use Promise.resolve to wrap a promise 
 *      around a result that turns back into the result so the code doesn't break
 */
    sequelize.sync() //{force: true})
        .then(result => {
            return User.findByPk(1); 
        }).then(user => {
            if(!user){
                return User.create({
                    name: 'Elvis',
                    email: 'tst.email' 
                })
            }
            return Promise.resolve(user);

            }).then(user => {
                // console.log(user);
                app.listen(3000);
            })
            .catch(err => {console.log(err)});




// old code 
/**
 * server 
 * server has two methods 
 * response: from server to user 
 * Request: from user to server 
 * You must use event listeners like request.on and attach functionality to it in order to have specific pieces of code 
 * run when the data has been loaded to preven bottle necks on the server
 */

//const server = http.createServer(app);

// server port listening
// server.listen(3000);

// server listen using express 


