/**
 * Instead of writing our own queries using sql we can turn to an ORM called 
 * Sequilize to help manage the complexity of sql for us 
 * Allowing us to focus on purely writing java script
 */
// imports
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 
'root', 
'admin', 
{dialect: 'mysql', host:'localhost'});

module.exports = sequelize;



















// old code 
// // import the mysql package  
// const mysql = require('mysql2');

// /**  
//  * Note: sql pools
//  * rather than having a single connection that can be busy when being used 
//  * you can have a connection pull that allows you to have multiple connections 
//  * such that you may have multiple queries running at the same time to avoid bottle necks  
//  * once the connection is done it gets put back into the pool  
//  */

// // arguments is a java script object that describes the data base we will connect to

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete', 
//     password: 'admin' 
// })

// module.exports  =  pool.promise();