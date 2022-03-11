const { Router } = require("express");
const { Genre, Videogame, Platform } = require("../db");
const router = Router();
router.post("/", async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    idPlatforms,
    idGenres,
    background_image,
  } = req.body;
  try {
    await Videogame.create({
      name,
      description,
      released,
      rating,
      background_image,
    }).then((result) => {
      result.addGenre(idGenres);
      return res.json(result.addPlatform(idPlatforms));
    });
  } catch (error) {
    console.log("No se agrego correctamente", error);
  }
});
module.exports = router;
