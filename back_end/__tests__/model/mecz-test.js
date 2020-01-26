const Mecz = require('../../model/mecz');

//resetowanie stanu bazy danych przed każdym testem
beforeEach(() => {
    Mecz.initData();
});

test('listTest()', () => {
    const mecze = Mecz.list();
    expect(mecze.length).toBe(3);
});

test('addTest()', () => {
    const newMecz = new Mecz('11-10-2019', '0-1', '1211111', '44446444' );
    Mecz.add(newMecz);
    const mecze = Mecz.list();
    expect(mecze.length).toBe(4);
    const addedMecz = mecze[3];
    expect(addedMecz.data).toBe("11-10-2019");
    expect(addedMecz.wynik).toBe("0-1");
    expect(addedMecz.druzynaId).toBe('1211111');
    expect(addedMecz.druzyna2Id).toBe('44446444');
});

test('editTest()', () => {
   /* let newZawodnik = new Mecz("Sławomir", "Kowal", '22-09-2019', '22-09-2019', 'test team', 1);
    Mecz.edit(newZawodnik);
    const zawodnicy = Mecz.list();
    const addedZawodnik = zawodnicy[2];
    expect(addedZawodnik.firstName).toBe("Sławomir");
    expect(addedZawodnik.lastName).toBe("Kowal");
    expect(addedZawodnik.birthdate).toBe('22-09-2019');
    expect(addedZawodnik.dateJoined).toBe('22-09-2019');
    expect(addedZawodnik.team).toBe('test team');
    */

});

test('deleteTest()', () => {
    Mecz.delete(1);
    expect(Mecz.list().length).toBe(2);
});

test('detailsTest()', () => {
    let mecz = Mecz.details(1);
    expect(mecz.data).toBe("22-09-2019");
    expect(mecz.wynik).toBe("2-1");
    expect(mecz.druzynaId).toBe('1111111');
    expect(mecz.druzyna2Id).toBe('44444444');
});