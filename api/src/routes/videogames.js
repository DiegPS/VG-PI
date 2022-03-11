const { Router } = require("express");
const router = Router();
const getGames = require("../utils/getGames.js");
const { Videogame, Genre, Platform } = require("../db.js");
const { GAMES_ALL_ENDPOINT } = require("../endpoints.js");
router.get("/", async (req, res) => {
  const { name } = req.query;
  let api = await getGames(GAMES_ALL_ENDPOINT);
  let db = await Videogame.findAll({
    attributes: [
      "id",
      "name",
      "background_image",
      "rating",
      "released",
      "released",
    ],
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
  const apiDb = [...api, ...db];

  if (name) {
    let gameQuery = apiDb.filter((elem) =>
      elem.name.toLowerCase().includes(name.toLowerCase())
    );
    if (gameQuery.length >= 1)
      return res.status(200).send(gameQuery.slice(0, 16));
    res.status(404).json({ msg: "Game not found" });
  }
  res.status(200).json(apiDb);
});
module.exports = router;
