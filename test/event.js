"use strict";

const Event = require('../models/event');
const eventManager = require('../models/eventManager');
const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const idEvent = '6bf9891259f1168c70b71d20635b974d264c751f0453cd4bd22066d0049765e2';

describe('Testing API REST', () => {
  before(() => {
    return eventManager.dropCollection()
      .then(() => {
        eventManager.add(new Event(
          "Concierto Metallica",
          "Evento Musical de calidad",
          "2017-04-09")
        );
        eventManager.add(new Event(
          "Concierto Red Hot Chilli Peppers",
          "Evento Musical de calidad maxima",
          "2017-04-10")
        );
        eventManager.add(new Event(
          "Concierto Maroon 5",
          "Evento Musical para ligar",
          "2017-04-11")
        );
        eventManager.add(new Event(
          "Concierto Rolling Stones",
          "Evento Musical de leyenda",
          "2017-04-12")
        );
        eventManager.add(new Event(
          "Concierto Mago de Oz",
          "Evento Musical de ponerse en pie y alzar el puño",
          "2017-04-13")
        );
      });
  });

  describe('Hello World Test!', () => {
    it('First test', () => true.should.equal(true));
  });

  describe('/GET all Events', () => {
    it('should GET all Events', () => {
      return chai.request(server)
        .get('/events')
        .then(res => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(5);
        });
    });
  });

  describe('/POST a new event', () => {
    it('should POST a new event', () => {
      let newEvent = new Event('Dualipa', 'Female Singer', '1988'),
          succesResponse = {
            status: 200,
            message: 'Event added!',
            length: 6,
            event: newEvent
          };
      return chai.request(server)
        .post('/events')
        .send(newEvent)
        .then(res => {
          succesResponse.event._id = res.body.event._id;
          res.should.have.status(200);
          res.body.should.be.eql(succesResponse)
        });
    });
  });

  describe('/GET one single event by id', () => {
    it('should GET an specific event by id (sha1)', () => {
      return chai.request(server)
        .get(`/events/${idEvent}`)
        .then(res => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.eql(1);
        })
    });
  });

  describe('/PUT an update on a single event by id', () => {
    it('should UPDATE an specific event by id (sha1)', () => {
      let newEvent = new Event('Duaplipa', 'Female Singer', '1988'),
          succesResponse = {
            status: 200,
            message: 'Event updated!',
            length: 6,
            event: newEvent
          };
      newEvent._id = idEvent;
      return chai.request(server)
        .put(`/events/${idEvent}`)
        .send(newEvent)
        .then(res => {
          res.should.have.status(200);
          res.body.should.be.eql(succesResponse);
        });
    });
  });

  describe('/DELETE a single event by id', () => {
    it('should DELETE an specific event by id (sha1)', () => {
      let newEvent = new Event('Duaplipa', 'Female Singer', '1988'),
          succesResponse = {
            status: 200,
            message: 'Event deleted!',
            length: 5
          };
      newEvent._id = idEvent;
      return chai.request(server)
        .delete(`/events/${idEvent}`)
        .then(res => {
          res.should.have.status(200);
          res.body.should.be.eql(succesResponse);
        });
    });
  });
});