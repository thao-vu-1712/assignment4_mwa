const { ObjectId } = require("mongodb");
const connection = require("../data/db.connection");

const getAll = (req, res) => {
    let offset = 0;
    let size = 3;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.size) {
        size = parseInt(req.query.size);
    }

    let db = connection.get();
    let collection = db.collection("games");

    collection.find().skip(offset * size).limit(size).toArray(function(err, games) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(games);
        }
    });
}

const getGamesLessThan7Users = (req, res) => {
    let offset = 0;
    let size = 3;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.size) {
        size = parseInt(req.query.size);
    }
    let db = connection.get();
    let collection = db.collection("games");

    collection.find({maxPlayers:{$lt:8}}).skip(offset * size).limit(size).toArray(function(err, games) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(games);
        }
    });
}

const insertNewGame = (req, res) => {
    if (req.body && req.body.title && req.body.price && req.body.minPlayers && req.body.minAge) {
        let db = connection.get();
        let collection = db.collection("games");
        let newGame = {};
        let minPlayers = parseInt(req.body.minPlayers);
        let minAge = parseInt(req.body.minAge);

        if (minAge < 7 || minAge > 99) {
            res.status(400).json({message: "Minimum age must be between 7-99"});
            return;
        }

        if (minPlayers < 1 || minPlayers > 10) {
            res.status(400).json({message: "Minimum number of players must be between 1 and 10"})
            return;
        }

        newGame.minPlayers = minPlayers;
        newGame.minAge = minAge;
        newGame.price = parseFloat(req.body.price);
        newGame.title = req.body.title;

        collection.insertOne(newGame, function(err, message) {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json(message);
        })

    } else {
        res.status(400).json({message: "missing params in body"})
    }
}

const getGameById = (req, res) => {
    let id = req.params.gameId;
    let db = connection.get();
    let collection = db.collection("games");
   
    collection.findOne({_id : ObjectId(id)}, function(err, game) {
        if (err) {
            res.status(400).json({err});
        } else {
            res.status(200).json(game);
        }
    });
}

const deleteGame = (req, res) => {
    let id = req.params.gameId;
    let db = connection.get();
    let collection = db.collection("games");
    collection.deleteOne({_id : ObjectId(id)}, function(err, message) {
        if (err) {
            res.status(400).json({err});
        } else {
            res.status(200).json({deleted: message.deletedCount === 1});
        }
    });
}

module.exports = {
    getAll,
    getGamesLessThan7Users,
    insertNewGame,
    getGameById,
    deleteGame
}