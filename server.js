var restify = require('restify');
var mongojs = require('mongojs');

var server = restify.createServer();
var db = mongojs('mongodb://assmin:assmin123@ds056998.mongolab.com:56998/giaptddemo', ['products']);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(3000, function(){
  console.log("server started at port 3000");
})
// getAll endpoint

server.get("/products",function(req,res,next)
{
  db.products.find(function(err,products){
    res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8'
      });
    res.end(JSON.stringify(products));

  });
  return next();
});

server.post('/product', function(req, res, next) {
    var product = req.params;
    db.products.save(product, function(err, data) {
        res.writeHead('200', {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});

server.put('/product/:id', function(req,res,next){
  //get the existing product
  db.products.findOne({id:req.params.id},function(err,data){
    var updateProduct = {};
    for(var n in data)
    {
      updateProduct[n] = data[n];
    }
    for(var n in req.params){
      updateProduct[n] = req.params[n];
    }
    db.products.update({id:req.params.id},updateProduct,{multi:false},function(err,data){
      res.writeHead(200, {
        'Content-Type':'application/json; charset=utf-8'
      });
      res.end(JSON.stringify(data));
    });
  });
  return next();
});

server.del('/product/:id', function (req, res, next) {
    db.products.remove({
        id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(true));
    });
    return next();
});

server.get('/product/:id', function (req, res, next) {
    db.products.findOne({
        id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});
module.exports = server;
