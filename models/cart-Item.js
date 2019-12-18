/**
 * Added Imports: 
 *    Package imports added through NPM 
 */
const Sequelize = require('sequelize'); 

/**
 * Custom Imports: 
 *    Custome created or configured imports from local file structures
 */
const sequelize = require('../Utils/database'); 

/**
 * Object: 
 *    Creating a cart-item object using the sequelize methods and instances
 *    The Cart Item 
 */

 const CartItem = sequelize.define('cartItem', {
   id:{
     type: Sequelize.INTEGER, 
     autoIncrement: true, 
     allowNull: false, 
     primaryKey: true
    }, 
    quantity: Sequelize.INTEGER
 })

 module.exports = CartItem;