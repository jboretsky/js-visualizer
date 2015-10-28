var PORT = process.env.PORT ? process.env.PORT : 3000;

var express = require('express');
var app = express();

app.use(express.static( 'public'));
app.set('views', './views');

app.set('view engine', 'jade');

app.get('/', function(req,res){
    res.render('index');
});

app.listen(PORT);
console.log('express app started on port 3000');
