// src/routes/mainRoutes.js

const express = require('express');
const router = express.Router();
const crud = require('../controllers/crudController');


router.get('/car/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const car = await crud.getCar(id, true);

    if (car) {
      res.json(car);
    }
    else {
      res.status(200).send('No Data');
    }
  } catch (error) {
    res.status(404)
  }
});

router.get('/car/cache/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const car = await crud.getCar(id);

    if (car) {
      res.json(car);
    }
    else {
      res.status(200).send('No Data');
    }
  } catch (error) {
    res.status(404)
  }
});



module.exports = router;