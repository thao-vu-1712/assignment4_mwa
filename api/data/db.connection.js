const MongoDBClient = require("mongodb").MongoClient;

let _connection = null;

const open = function() {
    if (get() === null) {
        MongoDBClient.connect("mongodb://localhost:27017", function(err, client) {
            if (err) {
                console.log("Error");
                return;
            }

            _connection = client.db("meanGames");
            console.log("Connect sucessfully");
        });
    }
}

const get = function() {
    return _connection;
}

module.exports = {
    open,
    get
}