var cradle = require('cradle');

var db = new(cradle.Connection)().database('list');

module.exports.insert = function(text, callback) {
    db.save({
        text: text
    }, callback);
};

module.exports.list = function(callback) {
    db.view('list/all', callback);
};

module.exports.delete = function(id, rev, callback) {
    db.remove(id, rev, callback);
}