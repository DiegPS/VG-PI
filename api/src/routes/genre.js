const { Router } = require("express");
const router = Router();
const getGenres = require("../utils/getGenres");
const { Genre } = require("../db.js");
const { GENRE_ENDPOINT } = require("../endpoints.js");
router.get("/", async (req, res) => {
  const check = await Genre.findOne({ where: { id: 1 } });
  if (check === null) {
    return getGenres(GENRE_ENDPOINT).then((datos) => {
      Genre.bulkCreate(datos);
      res.status(200).json(datos);
    });
  } else {
    const genre = await Genre.findAll();
    res.json(genre);
  }
});
module.exports = router;
