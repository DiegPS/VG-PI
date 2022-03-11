const { Router } = require("express");
const router = Router();
const getGames = require("../utils/getGames.js");
const { Videogame, Genre, Platform } = require("../db.js");
const { GAMES_ALL_ENDPOINT } = require("../endpoints.js");
router.get("/", async (req, res) => {
  let api = await getGames(GAMES_ALL_ENDPOINT);
  let db = await Videogame.findAll();
  api.concat(db);
  res.status(200).json(api);
});
module.exports = router;
