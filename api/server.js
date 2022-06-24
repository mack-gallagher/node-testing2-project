const express = require('express');
const Dragon = require('./DC_dragons_model');
const { validate_dragon, validate_dragon_id, validate_dragon_partial, } = require('./dragon_middleware');

const server = express();
server.use(express.json());

server.get('/api/dragons/', (req, res) => {
  Dragon.get_all()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'internal server error' });
    });
});

server.get('/api/dragons/:id', validate_dragon_id, (req, res) => {
  Dragon.get_by_id(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error' });
    })
});

server.post('/api/dragons/', validate_dragon, validate_dragon_partial, (req, res) => {
  Dragon.add(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error' });
    });
});

server.put('/api/dragons/:id', validate_dragon_id, validate_dragon_partial, (req, res) => {
  Dragon.update(req.params.id, req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'internal server error' });
    })
});

module.exports = server;
