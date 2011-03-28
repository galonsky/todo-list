function dueString(timestamp){
    var now = new Date().getTime();
    var days = Math.ceil((timestamp - now) / (1000*60*60*24));
    var ret;
    if(days == 0){
        ret = "due today";
    }
    else if(days > 0){
        ret = "due in " + days + " days";
    }
    else
    {
        ret = "overdue by " + Math.abs(days) + " days";
    }
    return ret;
}

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
            res[item].due = dueString(due);
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