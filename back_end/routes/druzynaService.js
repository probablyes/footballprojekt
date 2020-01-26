var express = require('express');
var router = express.Router();
const Druzyna = require('../model/druzyna');

router.get("/", (req, res, next) => {
    Druzyna.list()
        .then( ([druzyny, metadata]) => {
            res.json(druzyny);
        })
        .catch(err => {
            //błąd komunikacji z bazą danych
            console.log(err);
        });

});

router.get('/:druzynaId', (req, res, next) => {
    const druzynaId = req.params.druzynaId;
    Druzyna.details(druzynaId)
        .then( ([druzyna, metadata]) => {
            res.json(druzyna);
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/', (req, res, next) => {
    const nowaDruzyna = req.body;
    Druzyna.add(nowaDruzyna)
        .then(() => {
            //TODO
            //wysłać info o sukcesie
            //res.json(druzyna);
            console.log('stworzono');
            res.status(201).json(nowaDruzyna);
        })
        .catch(err => {
            console.log(err);
        });
});

router.put('/:druzynaId', (req, res, next) => {
    const druzynaId = req.body;
    const dId = req.params.druzynaId;
    druzynaId.id = dId;
    //Druzyna.edit(druzynaId);
    //res.status(204).end();
    Druzyna.edit(druzynaId)
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

router.delete('/:druzynaId', (req, res, next) => {
    const druzynaId = req.params.druzynaId;
    const nowaDruzyna = req.body;
    Druzyna.delete(druzynaId)
        .then(() => {
            //TODO
            //wysłać info o sukcesie
            console.log('usunieto');
            res.status(204).end();

        })
        .catch(err => {
            console.log(err);
            console.log('zwracam error');
            //res.status(400).send(new Error('nie możesz usunąć rekordu - usuń referencje'));
            res.status(400).send({
                message: 'nie możesz usunąć rekordu - usuń referencje'
            });
        });
});

module.exports = router;
