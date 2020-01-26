var express = require('express');
var router = express.Router();
const Zawodnik = require('../model/zawodnik');

router.get('/', function(req, res, next) {
    const zawodnicy = Zawodnik.list();
    res.json(zawodnicy);
});

router.get('/:zawodnikId', (req, res, next) => {
    const zawodnikId = req.params.zawodnikId;
    const zawodnik = Zawodnik.details(zawodnikId);
    res.json(zawodnik);
});

router.post('/', (req, res, next) => {
    const nowyZawodnik = req.body;
    console.log(`router post /users data: ${JSON.stringify(nowyZawodnik)}`);
    const createdZawodnik = Zawodnik.add(nowyZawodnik);
    res.status(201).json(createdZawodnik);
});

router.put('/:zawodnikId', (req, res, next) => {
    const zawodnikData = req.body;
    const zawId = req.params.zawodnikId;
    zawodnikData.id = zawId;
    Zawodnik.edit(zawodnikData);
    res.status(204).end();
});

router.delete('/:zawodnikId', (req, res, next) => {
    const zawodnikId = req.params.zawodnikId;
    console.log(`delete zawodnikId: ${zawodnikId}`);
    Zawodnik.delete(zawodnikId);
    res.status(204).end();
});

module.exports = router;
