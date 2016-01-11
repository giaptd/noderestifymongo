var restify = require('restify');
var server = require('./server');

var client = restify.createJsonClient({
    url:'http://localhost:3000'
});
var p = {};
client.get('/products', function(err, req, res, products) {
    if (err) {
        console.log("Error ocurred>>>");
        console.log(err);
    } else {
        console.log('total products ' + products.length);
        console.log('All products');
        p = products[0];
        console.log(p);
        console.log(products);
    }
});
