var cradle = require('cradle');

var db = new(cradle.Connection)().database('list');
db.create();

db.save('_design/list', {
    all: {
        map: function(doc) {
            if(doc.text)
            {
                emit(doc.timestamp, doc);
            }
        }
    }
});

module.exports.insert = function(text, callback) {
    var time = new Date().getTime();
    db.save({
        text: text,
        timestamp: time
    }, callback);
};

module.exports.list = function(callback) {
    db.view('list/all', callback);
};

module.exports.delete = function(id, rev, callback) {
    db.remove(id, rev, callback);
}