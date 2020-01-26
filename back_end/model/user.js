const db = require('../db/mysql');

class User {
    constructor(id, login, password){
        this.id = id;
        this.login = login;
        this.password = password;
    }

    //dodawanie obiektu do bazy
    static add(user) {
        return db.execute(
            'insert into user (login, password) values (?)',
            [user.login, user.password]
        );
    }
    //sprawdzanie obiektu na bazie po loginie
    static getByLogin(user) {
        return db.execute('select * from user where login = ' + db.escape(user));
    }

    //edycja obiektu



}



module.exports = User;
