const express = require('express');

const router = express.Router();

const actionDb = require('../helpers/actionModel.js');

router.post('/:project_id', (req, res) => {
  const changes = req.body;
  const project_id = req.params.project_id;

  actionDb.insert({...changes, "project_id": project_id})
    .then(action => {
      if(action) {
        res.status(201).json({ action });
      } else {
        res.status(404).json({ message: "the project could not be found" })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Error adding the project" });
    })
});

router.get('/', (req, res) => {
  actionDb.get()
    .then(actions => {
      res.status(200).json({ actions });
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving data" });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  actionDb.get(id)
    .then(action => {
      if(action) {
        res.status(200).json({ action });
      } else {
        res.status(400).json({ message: "invalid action id" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving data" });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  actionDb.remove(id)
    .then(count => {
      if(count > 0) {
        res.status(200).json({ message: 'The action has been deleted' });
      } else {
        res.status(404).json({ message: 'The action could not be found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error removing action" })
    })
});

router.put('/:id/:project_id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const project_id = req.params.project_id;

  actionDb.update(id, {...changes, "project_id": project_id})
    .then(answer => {
      if(answer === null) {
        res.status(404).json({ message: 'The action could not be found' })
      } else { 
        res.status(200).json({ answer });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The action could not be updated" });
    });
});

module.exports = router;