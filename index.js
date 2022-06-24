const server = require('./api/server');

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`server now listening on port ${PORT}!`);
});