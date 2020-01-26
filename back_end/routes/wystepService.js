var express = require('express');
var router = express.Router();
const Wystep = require('../model/wystep');

router.get('/', function(req, res, next) {
    Wystep.list()
        .then( ([wystep, metadata]) => {
            res.json(wystep);
        })
        .catch(err => {
            //błąd komunikacji z bazą danych
            console.log(err);
        });
});

router.get('/:wystepId', (req, res, next) => {
    const wystep = req.params.wystepId;
    // const mecz = Mecz.details(meczId);
    // const druzynaId = req.params.druzynaId;
    Wystep.details(wystep)
        .then( ([wys, metadata]) => {
            //console.log('qq',res.json(wystep).body);
            res.json(wys);
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/', (req, res, next) => {
    const nowyWystep = req.body;
    console.log(`router post /wystep data: ${JSON.stringify(nowyWystep)}`);
    const createdWystep = Wystep.add(nowyWystep);
    res.status(201).json(createdWystep);

    const nowyMecz = req.body;
    console.log('nowyMecz', nowyMecz);
    // console.log(`router post /users data: ${JSON.stringify(nowyMecz)}`);
    // const {id, firstName, lastName, birthdate, dateJoined, team} = req.body;
    // const createdMecz = Mecz.add(nowyMecz);
    // res.status(201).json(createdMecz);

    Mecz.add(nowyWystep)
        .then(() => {
            //TODO
            //wysłać info o sukcesie
            //res.json(druzyna);
            console.log('stworzono');
            res.status(201).json(nowyWystep);
        })
        .catch(err => {
            console.log(err);
        });
});

router.put('/:wystepId', (req, res, next) => {
    const wystepData = req.body;
    const wysId = req.params.wystepId;
    wystepData.id = wysId;

    Wystep.edit(wystepData)
        .then(() => {
            //TODO
            //wysłać info o sukcesie
            console.log('zmodyfikowano');
            res.status(204).end();

        })
        .catch(err => {
            console.log(err);
        });
});

router.delete('/:wystepId', (req, res, next) => {
    const wystepId = req.params.wystepId;
    console.log(`delete wystep: ${wystepId}`);
    Wystep.delete(wystepId)
        .then(() => {
            //TODO
            //wysłać info o sukcesie
            console.log('usunieto');
            res.status(204).end();

        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
