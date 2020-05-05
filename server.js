const express = require('express');
const helmet = require('helmet');

const server = express();

server.get('/', (req, res) => {
  res.send('<h1>node-api-challenge</h1>')
});

server.use(express.json());

// middleware

server.use(helmet());

server.use(logger);

// Routers

const actionRouter = require('./data/routers/actionRouter.js');

server.use('/api/actions', actionRouter);

const projectRouter = require('./data/routers/projectRouter.js');

server.use('/api/projects', projectRouter);

//server.use('/', ****Router);

// custom middleware

function logger(req, res, next) {
  console.log(`${req.method} - Method`);
  console.log(req.protocol + "://" + req.get('host') + req.url);
  console.log("Timestamp " + Date.now());
  next();
};

module.exports = server;