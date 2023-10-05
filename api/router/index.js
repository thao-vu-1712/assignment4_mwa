const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.route("/games").get(controller.getAll).post(controller.insertNewGame);

router.route("/filterGames").get(controller.getGamesLessThan7Users);

router.route("/games/:gameId").get(controller.getGameById).delete(controller.deleteGame);


module.exports = router;