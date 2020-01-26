var express = require('express');
var router = express.Router();
const User = require('../model/user');

router.get('/add', function(req, res, next) {
    User.add()
        .then( ([user, metadata]) => {
            res.json(user);
        })
        .catch(err => {
            //błąd komunikacji z bazą danych
            console.log(err);
        });
});

router.post('/', (req, res, next) => {
    // const user = req.map;
    const credentials = req.body;
    User.getByLogin(credentials.username)
        .then( ([db, metadata]) => {
            console.log('1')
            console.log(db)
            console.log('2'+credentials.password)
            console.log('3'+db[0].password)
            if(db[0].password == credentials.password ){
                res.status(200).json(true);
            }else{
                res.status(200).json(false);
            }
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
