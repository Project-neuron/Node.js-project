const fs = require('fs');

// request always goes before response 
const  requestHandler = (req, res) => {
    // checks for the type of status 
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    //if there is a post request 
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk); // gather all of post data 
        });
        // server request handling 
        return req.on('end', () => { // this is an asyncronous call where the method body won't run until it is called upon 
        const parsedBody = Buffer.concat(body).toString(); // put all the post data into a buffer 
        const message = parsedBody.split('=')[1]; // take out the data and put it into a message 
        
        // fs.writeFileSync('message.txt', message); syncronously create a file nothing else will run until this is done
        // server response section 
        fs.writeFile('message.txt', message, err => { // asyncronously create a file while this is working other parts of 
                res.statusCode = 302;                 // the code will be able to run 
                res.setHeader('Location', '/');
                return res.end();
            }); // asyncronous file writing 
        });
        
    }
    // if there is no post data in the request then a basic response is ok 
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
    

} 

//exporting a new js module can have multiple is neccessary 
module.exports = requestHandler;