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

server.post('/product',function(req,res,next){
  var product = req.params;
  db.products.save(product, function(err,data){
    res.writeHead('200',{
      'Content-Type':'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(data));
  });
  return next();
})

module.exports = server;
