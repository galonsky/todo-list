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
        for(item in res)
        {
            var due = res[item].value.duetimestamp;
            var now = new Date().getTime();
            var days = Math.floor((due - now) / (1000*60*60*24)) + 1;
            res[item].days = days;
        }
        //console.log(res);
        httpResponse.render('list', {
            locals: {items: res}
        });
    });
});



app.post('/', function(req, httpResponse) {
    var text = req.body.todo.text;
    var due = req.body.todo.due;
    data.insert(text, due, function(err, res) {
        httpResponse.redirect('/');
    });
});

app.get('/delete/:id/:rev', function(req, httpResponse) {
    var id = req.params.id;
    var rev = req.params.rev;
    data.delete(id, rev, function(err, res) {
        httpResponse.redirect('/');
    });
});

app.listen(4000);