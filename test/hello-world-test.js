const eventHandler = require('../models/eventHandler');
const Event = require('../models/Event');
const EventError = require('../models/EventError');
const StatusMessage = require('../models/StatusMessage');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const should = chai.should();
const dbController = require('../models/dbController');

chai.use(chaiHttp);

let idEvent;

describe('API REST', () => {
  before(() => {
    //dbController.dropCollection();
    dbController.insertEventDocument(new Event({
        title: "Concierto Metallica",
        description: "Evento Musical de calidad",
        date: "2017-04-09"}), () => console.log('inserted'));
    dbController.insertEventDocument(new Event({
      title: "Concierto Red Hot Chilli Peppers",
      description: "Evento Musical de calidad maxima",
      date: "2017-04-10"}), () => console.log('inserted'));
    dbController.insertEventDocument(new Event({
      title: "Concierto Maroon 5",
      description: "Evento Musical para ligar",
      date: "2017-04-11"}), () => console.log('inserted'));
    dbController.insertEventDocument(new Event({
      title: "Concierto Rolling Stones",
      description: "Evento Musical de leyenda",
      date: "2017-04-12"}), () => console.log('inserted'));
    dbController.insertEventDocument(new Event({
      title: "Concierto Mago de Oz",
      description: "Evento Musical de ponerse en pie y alzar el puño",
      date: "2017-04-13"}), () => console.log('inserted'));
  });

  describe('Hello World Test!', () => {
      it('First test', () => assert.equal( true , 1 === 1 , "Everything is alright!"));
  });

  describe('/GET all Events', () => {
      it('should GET all Events', (done) => {
          chai.request(server)
              .get('/events')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(5);
                  idEvent = res.body[0]._id;
                  done();
          })
      });
  });

  describe('/GET one single event by id', () => {
      it('should GET an specific event by id (sha1)', (done) => {
          chai.request(server)
              .get(`/events/${idEvent}`)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
                  res.body._id.should.be.eql(idEvent);
                  done();
          })
      });
  });

  describe('/POST a new event', () => {
      it('should POST a new event', (done) => {
          let realEvent = new Event(
            "Concierto Rolling Stones",
            "Evento Musical de leyenda",
            "2017-04-12");

          chai.request(server)
              .post('/events')
              .send(realEvent)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.event.title.should.be.equal(realEvent.title);
                  res.body.event.description.should.be.equal(realEvent.description);
                  res.body.event.date.should.be.equal(realEvent.date);
                  done();
          })
      });
  });

  describe('/PUT an update on a single event by id', () => {
      it('should update an specific event by id (sha1)', (done) => {
          let fakeEvent = {
              "id": idEvent,
              "title": "Duaplipa",
              "description": "Female Singer",
              "date": "1988"
          };
          let fakeSuccesResponse = {status: 200, message: 'Event updated!', event: fakeEvent};
          chai.request(server)
              .put(`/events/${idEvent}`)
              .send(fakeEvent)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.eql(fakeSuccesResponse);
                  done();
          })
      });
  });

  describe('/DELETE a single event by id', () => {
      it('should delete an specific event by id (sha1)', (done) => {
          let fakeEvent = {
              "id": idEvent,
              "title": "Duaplipa",
              "description": "Female Singer",
              "date": "1988"
          };
          let fakeSuccesResponse = {status: 200, message: 'Event deleted!'};
          chai.request(server)
              .delete(`/events/${idEvent}`)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.eql(fakeSuccesResponse);
                  done();
          })
      });
  });
});