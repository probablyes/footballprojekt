const db = require('../db/mysql');

class Druzyna {
    constructor(nazwa, id){
        this.id = id;
        this.nazwa = nazwa;
    }

    //dodawanie obiektu do bazy
    static add(druzyna) {
        return db.execute(
            'insert into druzyna (nazwa) values (?)',
            [druzyna.nazwa]
        );
    }
    //pobranie listy obiektów
    static list() {
        return db.execute('select * from druzyna');
    }

    //edycja obiektu
    static edit(record) {
        // let druzynaToBeChanged = druzynaExtent.find(x => x.id == druzyna.id);
        // if(druzynaToBeChanged != null & druzynaToBeChanged != undefined) {
        //     this.delete(druzyna.id);
        // }
        return db.execute(
            'UPDATE druzyna SET nazwa = ' + db.escape(record.nazwa) + ' WHERE Id = ' + db.escape(record.Id)
        );
    }


    //usuwanie obiektu po id
    static delete(id) {
        return db.execute(
            'DELETE FROM druzyna where Id = ' + db.escape(id)
        );
    }

    //pobieranie obiektu do widoku szczegółów
    static details(id) {
        return db.execute(
            'select * from druzyna where Id = ' + db.escape(id)
        );
    }

    //pobieranie obiektu do widoku szczegółów
    static details2(nazwa) {
        return db.execute(
            'select * from druzyna where nazwa = ' + db.escape(nazwa)
        );
    }

    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów

   /* static initData() {
        //usuwamy zawartość tablicy
        druzynaExtent.splice(0, druzynaExtent.length);
        //resetujemy licznik id
        nextId = 1;
        Druzyna.add(new Druzyna('Real Madryt'));
        Druzyna.add(new Druzyna('AC Milan'));
        Druzyna.add(new Druzyna('Manchester United'));
    }
    */
}

//Druzyna.initData();


module.exports = Druzyna;
