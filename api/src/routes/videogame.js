const { Router } = require("express");
const { Genre, Videogame, Platform } = require("../db");
const router = Router();
const axios = require("axios");
const { GAME_PARAMS_ENDPOINT } = require("../endpoints.js");
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
router.get("/:videogameId", async (req, res) => {
  const { videogameId } = req.params;
  const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });

  if (videogameId.length < 6) {
    const { data } = await axios.get(GAME_PARAMS_ENDPOINT(videogameId));
    let {
      name,
      description,
      background_image,
      rating,
      released,
      genres,
      platforms,
    } = data;

    const gameDetails = {
      videogameId,
      name,
      description: description.replace(/(<([^>]+)>)/gi, " "),
      background_image,
      rating,
      released,
      genre: formatter.format(genres.map((e) => e.name)),
      platforms: formatter.format(platforms.map((e) => e.platform.name)),
    };
    res.status(200).json(gameDetails);
  } else {
    let videogame = await Videogame.findByPk(videogameId, {
      include: [
        {
          model: Genre,
          through: { attributes: [name] },
        },
        {
          model: Platform,
          through: { attributes: [name] },
        },
      ],
    });

    res.status(200).json(videogame);
  }
});
module.exports = router;
