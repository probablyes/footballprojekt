let nextId = 1;
let zawodnikExtent =[];

class Zawodnik {
    constructor(firstName, lastName, birthdate, dateJoined, team, id){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.dateJoined = dateJoined;
        this.team = team;
    }

    static add(zawodnik) {
        zawodnik.id = nextId++;
        if(zawodnik.firstName.length > 30){
            return null;
        }else{
            zawodnikExtent.push(zawodnik);
            return zawodnik;
        }
    }

    static list() {
        return zawodnikExtent;
    }

    static edit(zawodnik) {
        //console.log('zawodnik', zawodnik);
        let zawToBeChanged = zawodnikExtent.find(x => x.id == zawodnik.id);
        //console.log('zawToBeCh', zawToBeChanged);
        if(zawToBeChanged != null & zawToBeChanged != undefined) {
            this.delete(zawodnik.id);
        }
        //console.log('zawodnikExtent', zawodnikExtent);
        zawodnikExtent.push(zawodnik);
    }
    //usuwanie obiektu po id
    static delete(id) {
        //let desiredId = id;
        let newIntegerId = parseInt(id);
        var index = zawodnikExtent.map(x => {
            return x.id;
        }).indexOf(newIntegerId);
        zawodnikExtent.splice(index, 1);
    }

    //pobieranie obiektu do widoku szczegółów
    static details(id) {
        return zawodnikExtent.find(x => x.id == id);
    }

    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static initData() {
        //usuwamy zawartość tablicy
        zawodnikExtent.splice(0, zawodnikExtent.length);
        //resetujemy licznik id
        nextId = 1;
        Zawodnik.add(new Zawodnik('Jan', 'Kowalski', '22-09-2019', '22-09-2019', 'test team'));
        Zawodnik.add(new Zawodnik('Anna', 'Wiśniewska','22-09-2019', '22-09-2019', 'test team'));
        Zawodnik.add(new Zawodnik('Andrzej', 'Nowak','22-09-2019', '22-09-2019', 'test team'));
    }
}

Zawodnik.initData();

module.exports = Zawodnik;
