var express = require('express');

var app = express.createServer();

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
	app.use(express.logger());
	app.use(express.static(__dirname + '/static'));
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var data = require('./data');

app.get('/', function(req, httpResponse){
    data.list(function(err, res) {
        console.log(res);
        httpResponse.render('list', {
            locals: {items: res}
        });
    });
});



app.post('/', function(req, httpResponse) {
    var text = req.body.todo.text;
    data.insert(text, function(err, res) {
        httpResponse.redirect('/');
    });
});

app.listen(4000);