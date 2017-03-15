const express = require('express')
const app = express()
const bodyParser = require('body-parser');
 
let events = [
    {
    id: 1,
    title: "Concierto Metallica",
    description: "Evento Musical de calidad",
    date: "2017-04-09"
    },
    {
        id: 2,
        title: "Concierto Red Hot Chilli Peppers",
        description: "Evento Musical de calidad maxima",
        date: "2017-04-10"
    },
    {
        id: 3,
        title: "Concierto Maroon 5",
        description: "Evento Musical para ligar",
        date: "2017-04-11"
    },
    {
        id: 4,
        title: "Concierto Rolling Stones",
        description: "Evento Musical de leyenda",
        date: "2017-04-12"
    },
    {
        id: 5,
        title: "Concierto Mago de Oz",
        description: "Evento Musical de ponerse en pie y alzar el puño",
        date: "2017-04-13"
    }
];

app.get('/', (req, res) => res.send('Hello World from get with ES6!'));

app.get('/events', (req, res) => res.send(events));
app.get('/events/:id', (req, res) => res.send(events.find(ev => ev.id === parseInt(req.params.id, 10))));
app.post('/events', (req, res) => { console.log(req.body); res.send(req.body) } );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () =>  console.log('Example app listening on port 3000!'));