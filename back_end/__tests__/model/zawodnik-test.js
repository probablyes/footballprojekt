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
    const newZawodnik = new Zawodnik("Sławomir", "Kowal");
    Zawodnik.add(newUser);
    const zawodnicy = Zawodnik.list();
    expect(zawodnicy.length).toBe(4);
    const addedUser = zawodnicy[3];
    expect(addedUser.firstName).toBe("Sławomir");
    expect(addedUser.lastName).toBe("Kowal");
});

test('editTest()', () => {
    //...    
    // throw Error('test not implemented yet');
});

test('deleteTest()', () => {
    //...    
    // throw Error('test not implemented yet');
});

test('detailsTest()', () => {
    //...    
    // throw Error('test not implemented yet');
});