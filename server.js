const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send('<h1>node-api-challenge</h1>')
});

server.use(express.json());

// middleware

server.use(helmet());

// Routers

const actionRouter = require('./data/routers/actionRouter.js');

const projectRouter = require('./data/routers/projectRouter.js');

//server.use('/', ****Router);

// custom middleware

module.exports = server;