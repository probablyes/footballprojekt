const db = require('../db/mysql');

class Mecz {
    constructor(data, wynik, druzynaId, druzyna2Id, id){
        this.id = id;
        this.data = data;
        this.wynik = wynik;
        this.druzynaId = druzynaId;
        this.druzyna2Id = druzyna2Id;
    }

    static add(mecz) {
        console.log(mecz.Druzyna_Id);
        let druz1, druz2;
        // db.query("SELECT Id FROM druzyna WHERE nazwa = " + db.escape(mecz.Druzyna_Id), function (err, result) {
        //     if (err) throw err;
        //     console.log('tttt', result.Id);
        //     console.log('tttt2', result.TextRow);
        //
        //     druz1 = result;
        // });
        // db.query("SELECT Id FROM druzyna WHERE nazwa = " + db.escape(mecz.Druzyna_2_Id), function (err, result) {
        //     if (err) throw err;
        //     console.log(result);
        //     druz2 = result;
        // });
        //
        // return db.execute(
        //     'insert into mecz (Druzyna_Id, Druzyna_2_Id, data, wynik) values (?)',
        //     [mecz.Druzyna_Id, mecz.Druzyna_2_Id, mecz.data,mecz.wynik]
        // );

        var sql = "INSERT INTO mecz (Druzyna_Id, Druzyna_2_Id, data, wynik) VALUES ?";
        var values = [
            [mecz.Druzyna_Id, mecz.Druzyna_2_Id, mecz.data,mecz.wynik]
        ];
        return db.query(sql, [values], function (err, result) {
            if (err) throw err;
        });
    }

    static druzId(mecz) {
        return db.execute(
            'select Id from druzyna where Id = ' +db.escape(mecz.Druzyna_Id)
        );
    }

    static list() {
        return db.execute('select * from mecz');
    }

    static edit(record) {
        return db.execute(
            'UPDATE mecz SET Druzyna_Id = ' + db.escape(record.Druzyna_Id) + ', Druzyna_2_Id = ' + db.escape(record.Druzyna_2_Id) + ', data = '+db.escape(record.data) + ', wynik = '
            +db.escape(record.wynik) + ' WHERE Id = ' + db.escape(record.Id)
        );
    }

    static delete(id) {
        return db.execute(
            'DELETE FROM mecz where Id = ' + db.escape(id)
        );
    }

    static details(id) {
        return db.execute(
            'select * from mecz where Id = ' + db.escape(id)
        );
    }

    static initData() {
        // Mecz.add(new Mecz('22-09-2019', '2-1', '1111111', '44444444' ));
        // Mecz.add(new Mecz('22-09-2019', '1-1','2222222', '5555555'));
        // Mecz.add(new Mecz('22-09-2019', '0-3','333333', '111111' ));
    }
}

Mecz.initData();

module.exports = Mecz;
