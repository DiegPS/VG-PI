const { Router } = require("express");
const router = Router();
const getPlatforms = require("../utils/getPlatforms.js");
const { Platform } = require("../db.js");
const { PLATFORMS_ENDPOINT } = require("../endpoints.js");
router.get("/", async (req, res) => {
  const check = await Platform.findOne({ where: { id: 1 } });
  if (check === null) {
    return getPlatforms(PLATFORMS_ENDPOINT).then((datos) => {
      Platform.bulkCreate(datos);
      res.status(200).json(datos);
    });
  } else {
    const platform = await Platform.findAll();
    res.json(platform);
  }
});
module.exports = router;
