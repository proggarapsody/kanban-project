import jsonServer from 'json-server';
import path from 'path';
const server = jsonServer.create();

const router = jsonServer.router(
  path.resolve(path.dirname(''), 'database', 'db.json')
);

const middlewares = jsonServer.defaults({
  static: './build',
});

const PORT = process.env.PORT || 8000;

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);

server.use(router);

server.listen(PORT, () => {
  console.log('server is running');
});
