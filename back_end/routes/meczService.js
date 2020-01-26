var express = require('express');
var router = express.Router();
const Mecz = require('../model/mecz');
const Druzyna = require('../model/druzyna');

router.get("/", (req, res, next) => {
    console.log('sprawadzam mecz');
    Mecz.list()
        .then( ([mecze, metadata]) => {
            res.json(mecze);
        })
        .catch(err => {
            //błąd komunikacji z bazą danych
            console.log(err);
        });
});


router.get('/:meczId', (req, res, next) => {
    const meczId = req.params.meczId;
    // const mecz = Mecz.details(meczId);
    // const druzynaId = req.params.druzynaId;
    Mecz.details(meczId)
        .then( ([mecz, metadata]) => {
            res.json(mecz);
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/', (req, res, next) => {
    const nowyMecz = req.body;
    // console.log(`router post /users data: ${JSON.stringify(nowyMecz)}`);
    // const {id, firstName, lastName, birthdate, dateJoined, team} = req.body;
    // const createdMecz = Mecz.add(nowyMecz);
    // res.status(201).json(createdMecz);
   //console.log('body', body);
    const druzynaId = req.body.Druzyna_Id;
    Druzyna.details2(druzynaId)
        .then( ([druzyna, metadata]) => {
            console.log('dr Id', druzyna[0].Id);
            nowyMecz.Druzyna_Id = druzyna[0].Id;
            nowyMecz.Druzyna_2_Id = druzyna[0].Id;
            Mecz.add(nowyMecz)
                .then(() => {
                    console.log('stworzono');
                    res.status(201).json(nowyMecz);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });

    // Mecz.add(nowyMecz)
    //     .then(() => {
    //         //TODO
    //         //wysłać info o sukcesie
    //         //res.json(druzyna);
    //         console.log('stworzono');
    //         res.status(201).json(nowyMecz);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
});

router.put('/:meczId', (req, res, next) => {
    const meczId = req.body;
    const mId = req.params.meczId;
    meczId.id = mId;
    //Mecz.edit(meczId);
    //res.status(204).end();
    //const druzynaId = req.body;
    //const dId = req.params.druzynaId;
    // druzynaId.id = dId;
    //Druzyna.edit(druzynaId);
    //res.status(204).end();
    Mecz.edit(meczId)
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

router.delete('/:meczId', (req, res, next) => {
    const meczId = req.params.meczId;
    const nowyMecz = req.body;
    Mecz.delete(meczId)
        .then(() => {
            //TODO
            //wysłać info o sukcesie
            console.log('usunieto');
            res.status(204).end();

        })
        .catch(err => {
            console.log('zwracam error');
            res.status(400).send(new Error('nie możesz usunąć rekordu - usuń referencje'));
        });
});

module.exports = router;
