const axios = require("axios");
let getGames = (url, datos = [], count = 0) => {
  let promesa = new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        response.data.results.forEach((element) => {
          const { platforms, genres } = element;
          datos.push({
            id: element.id,
            name: element.name,
            background_image: element.background_image,
            rating: element.rating,
            released: element.released,
            genres: genres.map((g) => g.name).join(", "),
            platforms: platforms.map((m) => m.platform.name).join(", "),
          });
        });
        url = response.data.next;
        ++count;
        if (url === null || count === 5) resolve(datos);
        else resolve(getGames(url, datos, count));
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promesa;
};
module.exports = getGames;
