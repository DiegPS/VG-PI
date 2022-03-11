const { Router } = require("express");
const router = Router();
const getGames = require("../utils/getGames.js");
const { Videogame } = require("../db.js");
const { GAMES_ALL_ENDPOINT } = require("../endpoints.js");
router.get("/", async (req, res) => {
  const check = await Videogame.findOne({ where: { id: 1 } });
  if (check === null) {
    return getGames(GAMES_ALL_ENDPOINT).then((datos) => {
      Videogame.bulkCreate(datos);
      res.status(200).json(datos);
    });
  } else {
    const Videogame = await Videogame.findAll();
    res.json(Videogame);
  }
});
module.exports = router;
