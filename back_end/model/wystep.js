const db = require('../db/mysql');

class Wystep {
    constructor(zawodnikId, meczId, gole, asysty, minuty, zolte_kartki, czerwona_kartka, opis_wystepu, id){
        this.id = id;
        this.zawodnikId = zawodnikId;
        this.meczId = meczId;
        this.gole = gole;
        this.asysty = asysty;
        this.minuty = minuty;
        this.zolte_kartki = zolte_kartki;
        this.czerwona_kartka = czerwona_kartka;
        this.opis_wystepu = opis_wystepu;
    }

    static add(wystep) {
        //console.log(mecz.Druzyna_Id);
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

        console.log('wystep', wystep);
        var sql = "INSERT wystep (Zawodnik_Id, Mecz_Id, gole, asysty, minuty, zolte_kartki, czerwona_kartka, opis_wystepu) VALUES ?";
        var values = [
            [wystep.Zawodnik_Id, wystep.Mecz_Id,wystep.gole,wystep.asysty,wystep.minuty,wystep.zolte_kartki,false,wystep.opis_wystepu]
        ];
        return db.query(sql, [values], function (err, result) {
            if (err) throw err;
        });
    }

    static list() {
        return db.execute('select * from wystep inner join zawodnik on wystep.Zawodnik_Id=zawodnik.Id\n');
    }

    static edit(record) {
        return db.execute(
            'UPDATE wystep SET Zawodnik_Id = ' + db.escape(record.Zawodnik_Id) + ', Mecz_Id = ' + db.escape(record.Mecz_Id) + ', gole = '+db.escape(record.gole) + ', asysty = '
            +db.escape(record.asysty) + ', minuty = ' + db.escape(record.minuty) + ', zolte_kartki = ' + db.escape(record.zolte_kartki) + ', opis_wystepu = ' + db.escape(record.opis_wystepu) +
            ' WHERE Id_p = ' + db.escape(record.Id_p)
        );
    }

    static delete(id) {
        return db.execute(
            'DELETE FROM wystep where Id_p = ' + db.escape(id)
        );
    }

    static details(id) {
        return db.execute(
            'select * from wystep where Id_p = ' + db.escape(id)
        );
    }
}

// Wystep.initData();

module.exports = Wystep;
