const { Router } = require("express");
const router = Router();
const getGames = require("../utils/getGames.js");
const { Videogame, Genre, Platform } = require("../db.js");
const { GAMES_ALL_ENDPOINT } = require("../endpoints.js");
router.get("/", async (req, res) => {
  let api = await getGames(GAMES_ALL_ENDPOINT);
  let db = await Videogame.findAll({
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Platform,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  const apiDb = api.concat(db);
  res.status(200).json(apiDb);
});
module.exports = router;
