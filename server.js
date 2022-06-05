const jsonServer = require('json-server');
const server = jsonServer.create();
const routes = require('./database/routes.json');
const router = jsonServer.router('./database/db.json', {
  routes: './database/routes.json',
});

const middlewares = jsonServer.defaults({
  static: './build',
});

const PORT = process.env.PORT || 8000;

server.use(middlewares);
server.use(jsonServer.rewriter(routes));

server.use(router);

server.listen(PORT, () => {
  console.log('server is running');
});
