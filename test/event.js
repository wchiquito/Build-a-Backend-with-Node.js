"use strict";

const Event = require('../models/event');
const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Hello World Test!', () => {
  it('First test', () => true.should.equal(true));
});

describe('/GET all Events', () => {
  it('should GET all Events', (done) => {
    chai.request(server)
    .get('/events')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(5);
      done();
    })
  });
});

describe('/GET one single event by id', () => {
  it('should GET an specific event by id (sha1)', (done) => {
    let idEvent = '68819422197e5f1ddcc24903a84594677c687e701c623cd282cd59d8e5e4df2b';
    chai.request(server)
    .get(`/events/${idEvent}`)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.an('object');
      done();
    })
  });
});

 describe('/POST a new event', () => {
  it('should POST a new event', (done) => {
    let newEvent = new Event('Dualipa', 'Female Singer', '1988'),
        succesResponse = {
          status: 200,
          message: 'Event added!',
          length: 6,
          event: newEvent
        };
    chai.request(server)
    .post('/events')
    .send(newEvent)
    .end((err, res) => {
      succesResponse.event.id = res.body.event.id;
      res.should.have.status(200);
      res.body.should.be.eql(succesResponse)
      done();
    })
  });
});

describe('/PUT an update on a single event by id', () => {
  it('should UPDATE an specific event by id (sha1)', (done) => {
    let idEvent = '68819422197e5f1ddcc24903a84594677c687e701c623cd282cd59d8e5e4df2b',
        newEvent = new Event('Duaplipa', 'Female Singer', '1988'),
        succesResponse = {
          status: 200,
          message: 'Event updated!',
          length: 6,
          event: newEvent
        };
    newEvent.id = idEvent;
    chai.request(server)
    .put(`/events/${idEvent}`)
    .send(newEvent)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.eql(succesResponse);
      done();
    })
  });
});

describe('/DELETE a single event by id', () => {
  it('should DELETE an specific event by id (sha1)', (done) => {
    let idEvent = '68819422197e5f1ddcc24903a84594677c687e701c623cd282cd59d8e5e4df2b',
        newEvent = new Event('Duaplipa', 'Female Singer', '1988'),
        succesResponse = {
          status: 200,
          message: 'Event deleted!',
          length: 5,
          event: newEvent
        };
    newEvent.id = idEvent;
    chai.request(server)
    .delete(`/events/${idEvent}`)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.eql(succesResponse);
      done();
    })
  });
});