const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const dbController = require('../models/dbController');

chai.use(chaiHttp);

let idEvent;

let dummyUser = {
  "username": "hugo",
  "password": "secreto",
  "email": "hugo@gmail.com",
  "address": "Calle",
  "fullname": "HugoN"
};

const dummyUser2 = {
  "username": "william",
  "password": "secretisimo",
  "email": "wchiquito@gmail.com",
  "address": "Calle",
  "fullname": "wchiquito"
};

describe('API REST', () => {
  before(() => {
    dbController.dropCollection('events');
    dbController.dropCollection('users');
    dbController.insertUserDocument(dummyUser, newUser => dummyUser._id = newUser._id);
  });

  describe('Events', () => {
    describe('Hello Event-Tests!', () => {
      it('First test', () => assert.equal(true , 1 === 1 , "Everything is alright!"));
    });

    describe('/POST multiple events', () => {
      it('should POST multiple events', (done) => {
        let createEvents = (newEvent) => {
          chai.request(server)
            .post('/events')
            .auth(dummyUser.username, dummyUser.password)
            .send(newEvent)
            .end((err, res) => {
              let event = res.body;
              res.should.have.status(201);
              event.title.should.be.equal(newEvent.title);
              event.description.should.be.equal(newEvent.description);
              event.date.should.be.equal(newEvent.date);
            });
          }
          createEvents({
            title: "Concierto Metallica",
            description: "Evento Musical de calidad",
            date: "2017-04-09T00:00:00.000Z"});
          createEvents({
            title: "Concierto Red Hot Chilli Peppers",
            description: "Evento Musical de calidad maxima",
            date: "2017-04-10T00:00:00.000Z"});
          createEvents({
            title: "Concierto Maroon 5",
            description: "Evento Musical para ligar",
            date: "2017-04-11T00:00:00.000Z"});
          createEvents({
            title: "Concierto Rolling Stones",
            description: "Evento Musical de leyenda",
            date: "2017-04-12T00:00:00.000Z"});
          createEvents({
            title: "Concierto Mago de Oz",
            description: "Evento Musical de ponerse en pie y alzar el puño",
            date: "2017-04-13T00:00:00.000Z"});
          done();
        });
    });

    describe('/GET all Events', () => {
      it('should GET all Events', (done) => {
        chai.request(server)
          .get('/events')
          .auth(dummyUser.username, dummyUser.password)
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
          .auth(dummyUser.username, dummyUser.password)
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
          .auth(dummyUser.username, dummyUser.password)
          .send(newEvent)
          .end((err, res) => {
            let event = res.body;
            res.should.have.status(201);
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
          .auth(dummyUser.username, dummyUser.password)
          .send(updateEvent)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.eql(fakeSuccesResponse);
            done();
          });
      });
    });

      describe('/PUT an update on a single event by id not being owner', () => {
      it('should fail trying to update an event not being the owner', (done) => {
        let updateEvent = {
          "_id": idEvent,
          "title": "Duaplipa",
          "description": "Female Singer",
          "date": "1988"
        },
        fakeSuccesResponse = { n: 1, nModified: 1, ok: 1 };
        chai.request(server)
          .put(`/events/${idEvent}`)
          .auth(dummyUser2.username, dummyUser2.password)
          .send(updateEvent)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });

    describe('/DELETE a single event by id', () => {
      it('should delete an specific event by id (sha1)', (done) => {
        let fakeSuccesResponse = { n: 1, ok: 1 };
        chai.request(server)
          .delete(`/events/${idEvent}`)
          .auth(dummyUser.username, dummyUser.password)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.eql(fakeSuccesResponse);
            done();
          });
      });
    });

      describe('/DELETE a single event by id not being owner', () => {
      it('should fail trying to delete an event not being the owner', (done) => {
        let fakeSuccesResponse = { n: 1, ok: 1 };
        chai.request(server)
          .delete(`/events/${idEvent}`)
          .auth(dummyUser2.username, dummyUser2.password)
          .end((err, res) => {
            res.should.have.status(401);
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
          .auth(dummyUser.username, dummyUser.password)
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

    describe('Find all events organized by an User', () => {
      it('should return all events registered for an user', (done) => {
        chai.request(server)
          .get(`/${dummyUser._id.toString()}/events`)
          .auth(dummyUser.username, dummyUser.password)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(5);
            done();
          });
      });
    });
  });
  
  describe('Users', () => {
    describe('Hello User-Tests!', () => {
      it('Sanity test', () => assert.equal(true, 1 === 1, "Everything is alright!"));
    });

    describe('User should be asked to identify when requests for any authenticated operation', () => {
      it('should be asked to authenticate', (done) => {
        chai.request(server)
          .get('/logintest')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });

    describe('User should be logged successfully with demo user,', () => {
      it('should return username and email after successful loggin', (done) => {
        chai.request(server)
          .get('/test')
          .auth(dummyUser.username, dummyUser.password)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.eql({ "username": dummyUser.username,  "email": dummyUser.email});
            done();
          });
      });
    });

    describe('User should be redirect succesfully to requested resource when logs in correctly', () => {

    });

    describe('User should be promted with an error when tries to logs in incorrectly', () => {

    });
  });
});