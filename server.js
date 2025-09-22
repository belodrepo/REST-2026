const express = require("express"); //Express importálása
const app = express(); //Express példányosítása
//const port = 3000; //Port beállítása

//Middleware - köztes alkalmazások
app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]


//GET végpont egy szöveges üzenet visszaküldésre
app.get('/hello', (req, res) => {
    res.send("Hello itt az Express webszerver!");
})

app.get('/api/courses', (req, res) => {
    res.json(courses);
    //console.log(courses);
})


//Egyetlen kurzus adatainak a lekérése URL paraméter alapján
app.get('/api/courses/:id', (req, res) => {
    //Keresés a tömbben ID (URL paraméter alapján)
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //A keresett elem nem található (404) státusz kód és hibaüzenet visszaadása
    if (!course) res.status(404).send('A megadott ID-val nem létezik kurzus!');
    res.json(course); //Visszadjuk a keresett kurzust
    console.log(course);
    console.log(req.params.id);
})

//POST végpont létrehozása kurzus adatok küldésére a szervernek
app.post('/api/courses', (req, res) => {
//Új kurzus objektum létrehozása (Az ID automatikus növelése)
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
courses.push(course); //Az új kurzus objektum hozzáadása a courses tömbhöz
res.json({ message: 'Új elem hozzáadva!', data: req.body}); //A kibővített kurzus adatainak a lekérése JSON formátumban

})

//DELETE végpont a kurzus adatok törlésére
app.delete('/api/courses/:id', (req, res) => {
    //Keresés a tömbben ID (URL paraméter alapján)
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //Ha nincs ilyen elem, akor 404-es státuszkódot és egy hibaüzenete adjon vissza
    if (!course) res.status(404).send('A megadott azonosítóval nincs kurus!');
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.json({ message: 'Sikeres adattörlés', data: req.body});
})

//PUT - a kiválasztott kurus adatainak a módosítása
app.put('/api/courses/:id', (req, res) => {
    //Keresés a tömbben ID (URL paraméter alapján)
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //Ha nincs ilyen elem, akor 404-es státuszkódot és egy hibaüzenete adjon vissza
    if (!course) res.status(404).send('A megadott azonosítóval nincs kurus!');
    course.name = req.body.name;
    res.json({ message: 'Sikeres adatmódosítás', data: req.body});
})

//Az adott munkamenethez (session) tartozó portszám meghatározása
const port = process.env.PORT || 3000;
//A webszerver elindítása
app.listen(port, () => {
    console.log(`A webszerver figyel a localhost:${port} webcímen`);
})