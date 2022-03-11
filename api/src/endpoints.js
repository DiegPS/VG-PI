module.exports = {
  GAMES_ALL_ENDPOINT: `https://api.rawg.io/api/games?key=9cddb52ef8f0483ea0aa77a78e0eb78b`,
  GAME_QUERY_ENDPOINT: `https://api.rawg.io/api/games?search={game}`,
  GENRE_ENDPOINT: `https://api.rawg.io/api/genres?key=9cddb52ef8f0483ea0aa77a78e0eb78b`,
  GAME_PARAMS_ENDPOINT: (id) =>
    `https://api.rawg.io/api/games/${id}?key=9cddb52ef8f0483ea0aa77a78e0eb78b`,
  PLATFORMS_ENDPOINT: `https://api.rawg.io/api/platforms?key=9cddb52ef8f0483ea0aa77a78e0eb78b`,
};
