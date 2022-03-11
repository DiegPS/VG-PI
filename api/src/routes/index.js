const { Router } = require("express");
const router = Router();

const videogame = require("./videogame");
const videogames = require("./videogames");
const genre = require("./genre");
const platform = require("./platform");

router.use("/videogame", videogame);
router.use("/videogames", videogames);
router.use("/genre", genre);
router.use("/platforms", platform);

module.exports = router;
