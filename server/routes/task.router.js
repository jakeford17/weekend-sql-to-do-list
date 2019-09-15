const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//GET
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "tasks"`;
    pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting tasks', error);
      res.sendStatus(500);
    });
  });

//POST
router.post('/',  (req, res) => {
    let newTask = req.body;
    console.log(`Adding task`, newTask);
    let queryText = `INSERT INTO "tasks" ("task") VALUES ($1);`;
    pool.query(queryText, [newTask.task])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
  });

//PUT
router.put('/status/:id',  (req, res) => {
    let status = req.body.status;
    let id = req.params.id;
    console.log(`Updating Task ${id} with`, status);
    let queryText = '';
    if(status === "Completed Task"){
      queryText = `UPDATE "tasks" SET "status" = 'True' WHERE "id" = $1;`; 
    }else{
        res.sendStatus(500);
        return;
    }
    pool.query(queryText, [id])
      .then((result) => {
          res.sendStatus(200);
      }).catch((error) => {
          console.log("Error making PUT request", error);
          res.sendStatus(500);
      })
  });

//DELETE
router.delete('/:id', (req, res) => {
    let queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then((result) => {
        console.log("DELETE TASK WITH ID: ", req.params.id);
        res.sendStatus(200);
    }).catch((error) => {
        console.log("Error making query: ", error);
        res.sendStatus(500);
    })
})

module.exports = router;