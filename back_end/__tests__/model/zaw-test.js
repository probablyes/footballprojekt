const Zawodnik = require('../../model/zawodnik');

//resetowanie stanu bazy danych przed każdym testem
beforeEach(() => {
    Zawodnik.initData();
});

test('listTest()', () => {
    const zawodnicy = Zawodnik.list();
    expect(zawodnicy.length).toBe(3);
});

test('addTest()', () => {
    const newZawodnik = new Zawodnik("Sławomir", "Kowal", '22-09-2019', '22-09-2019', 'test team');
    Zawodnik.add(newZawodnik);
    const zawodnicy = Zawodnik.list();
    expect(zawodnicy.length).toBe(4);
    const addedZawodnik = zawodnicy[3];
    expect(addedZawodnik.firstName).toBe("Sławomir");
    expect(addedZawodnik.lastName).toBe("Kowal");
    expect(addedZawodnik.birthdate).toBe('22-09-2019');
    expect(addedZawodnik.dateJoined).toBe('22-09-2019');
    expect(addedZawodnik.team).toBe('test team');

});

test('editTest()', () => {
    let newZawodnik = new Zawodnik("Sławomir", "Kowal", '22-09-2019', '22-09-2019', 'test team', 1);
    Zawodnik.edit(newZawodnik);
    const zawodnicy = Zawodnik.list();
    const addedZawodnik = zawodnicy[2];
    expect(addedZawodnik.firstName).toBe("Sławomir");
    expect(addedZawodnik.lastName).toBe("Kowal");
    expect(addedZawodnik.birthdate).toBe('22-09-2019');
    expect(addedZawodnik.dateJoined).toBe('22-09-2019');
    expect(addedZawodnik.team).toBe('test team');
});

test('deleteTest()', () => {
    Zawodnik.delete(1);
    expect(Zawodnik.list().length).toBe(2);
});

test('detailsTest()', () => {
    let zaw = Zawodnik.details(1);
    expect(zaw.firstName).toBe("Jan");
    expect(zaw.lastName).toBe("Kowalski");
    expect(zaw.birthdate).toBe('22-09-2019');
    expect(zaw.dateJoined).toBe('22-09-2019');
    expect(zaw.team).toBe('test team');
});