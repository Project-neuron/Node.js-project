/**
 * 
 * In order to avoid having to step in and out of the files (../)  when we make use of the path variable for 
 * our routes
 * 
 * We can package the root file using the code below to capture the directory name so we don't need to worry about getting in 
 * and out of a paticular directory
 */

const path = require('path');
module.exports = path.dirname(process.mainModule.filename)