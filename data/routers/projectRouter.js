const express = require('express');

const router = express.Router();

const projectDb = require('../helpers/projectModel.js');

router.post('/', (req, res) => {
  projectDb.insert(req.body)
    .then(project => {
      res.status(201).json({ project });
    })
    .catch(err => {
      res.status(500).json({ error: "Error adding the project" });
    });
});

router.get('/', (req, res) => {
  projectDb.get()
    .then(projects => {
      res.status(200).json({ projects });
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving data" });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  projectDb.get(id)
    .then(project => {
      if(project) {
        res.status(200).json({ project });
      } else {
        res.status(400).json({ message: "invalid project id" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving data" });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  projectDb.remove(id)
    .then(count => {
      if(count > 0) {
        res.status(200).json({ message: 'The project has been deleted' });
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error removing project" })
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  projectDb.update(id, changes)
    .then(answer => {
      if(answer === null) {
        res.status(404).json({ message: 'The project could not be found' })
      } else { 
        res.status(200).json({ answer });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The project could not be updated" });
    });
});

router.get('/actions/:id', (req, res) => {
  const { id } = req.params;

  projectDb.getProjectActions(id)
    .then(actions => {
      if(actions) {
        res.status(200).json({ actions });
      } else {
        res.status(400).json({ message: "invalid project id" });
      }
    })
    .catch(err => {
      res.status(400).json({ error: "Error retrieving data" });
    });
});


// custom middleware

// function validateProjectId(req, res, next) {
//   const { id } = req.params;


// };

module.exports = router;