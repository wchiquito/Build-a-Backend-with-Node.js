const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const dbController = require('../models/dbController');

chai.use(chaiHttp);

let idEvent;

describe('API REST', () => {
  before(() => {
    dbController.dropCollection();
    dbController.insertEventDocument({
        title: "Concierto Metallica",
        description: "Evento Musical de calidad",
        date: "2017-04-09"}, () => {});
    dbController.insertEventDocument({
      title: "Concierto Red Hot Chilli Peppers",
      description: "Evento Musical de calidad maxima",
      date: "2017-04-10"}, () => {});
    dbController.insertEventDocument({
      title: "Concierto Maroon 5",
      description: "Evento Musical para ligar",
      date: "2017-04-11"}, () => {});
    dbController.insertEventDocument({
      title: "Concierto Rolling Stones",
      description: "Evento Musical de leyenda",
      date: "2017-04-12"}, () => {});
    dbController.insertEventDocument({
      title: "Concierto Mago de Oz",
      description: "Evento Musical de ponerse en pie y alzar el puño",
      date: "2017-04-13"}, () => {});
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
        });
    });
  });

  describe('/GET one single event by id', () => {
    it('should GET an specific event by id (sha1)', (done) => {
      chai.request(server)
        .get(`/events/${idEvent}`)
        .end((err, res) => {
          let event = res.body[0];
          res.should.have.status(200);
          event.should.be.a('Object');
          event._id.should.be.eql(idEvent);
          done();
        });
    });
  });

  describe('/POST a new event', () => {
    it('should POST a new event', (done) => {
      let newEvent = {
        title: "Concierto Rolling Stones II",
        description: "Evento Musical de leyenda",
        date: "2018-04-12T00:00:00.000Z"
      };
      chai.request(server)
        .post('/events')
        .send(newEvent)
        .end((err, res) => {
          let event = res.body;
          res.should.have.status(200);
          event.title.should.be.equal(newEvent.title);
          event.description.should.be.equal(newEvent.description);
          event.date.should.be.equal(newEvent.date);
          done();
        });
    });
  });

  describe('/PUT an update on a single event by id', () => {
    it('should update an specific event by id (sha1)', (done) => {
      let updateEvent = {
        "_id": idEvent,
        "title": "Duaplipa",
        "description": "Female Singer",
        "date": "1988"
      },
      fakeSuccesResponse = { n: 1, nModified: 1, ok: 1 };
      chai.request(server)
        .put(`/events/${idEvent}`)
        .send(updateEvent)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.eql(fakeSuccesResponse);
          done();
        });
    });
  });

  describe('/DELETE a single event by id', () => {
    it('should delete an specific event by id (sha1)', (done) => {
      let fakeSuccesResponse = { n: 1, ok: 1 };
      chai.request(server)
        .delete(`/events/${idEvent}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.eql(fakeSuccesResponse);
          done();
        });
    });
  });

  describe('/GET one single event by title', () => {
    it('should GET an specific event by title', (done) => {
      let eventFilter = {
        title: "Concierto Rolling Stones II"
      };
      chai.request(server)
        .post('/event/find')
        .send(eventFilter)
        .end((err, res) => {
          let event = res.body[0];
          res.should.have.status(200);
          event.should.be.a('Object');
          event.title.should.be.eql(eventFilter.title);
          done();
        });
    });
  });
});