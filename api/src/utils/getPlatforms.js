const axios = require("axios");
let getPlatforms = (url, datos = []) => {
  let promesa = new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        response.data.results.forEach((element) => {
          const { id, name, image_background } = element;
          datos.push({
            id: id,
            name: name,
            image_background,
          });
        });
        url = response.data.next;
        if (url === null) resolve(datos);
        else resolve(getPlatforms(url, datos));
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promesa;
};
module.exports = getPlatforms;
