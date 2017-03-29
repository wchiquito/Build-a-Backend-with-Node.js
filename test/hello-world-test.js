const Event = require('../models/events');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

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
                done();
        })
    });
});

describe('/GET one single event by id', () => {
    it('should GET an specific event by id (sha1)', (done) => {
        chai.request(server)
            .get('/events/68819422197e5f1ddcc24903a84594677c687e701c623cd282cd59d8e5e4df2b')
            .end((err, res) => {
                res.should.have.status(200);
                //res.body.length.should.be.eql(5);
                done();
        })
    });
});

 describe('/POST a new event', () => {
    it('should POST a new event', (done) => {
        //let newEvent = new Event('Dualipa', 'Female Singer', '1988');
        let fakeEvent = {
            "title": "Duaplipa",
            "description": "Female Singer",
            "date": "1988"
            }
        let fakeSuccesResponse = {status: 200, message: 'Event added!', length: 6, event: fakeEvent};

        chai.request(server)
            .post('/events')
            .send(fakeEvent)
            .end((err, res) => {
                fakeSuccesResponse.event.id = res.body.event.id;
                res.should.have.status(200);
                res.body.should.be.eql(fakeSuccesResponse)
                done();
        })
    });
});

describe('/PUT an update on a single event by id', () => {
    it('should update an specific event by id (sha1)', (done) => {
        let fakeEvent = {
            "id": "68819422197e5f1ddcc24903a84594677c687e701c623cd282cd59d8e5e4df2b",
            "title": "Duaplipa",
            "description": "Female Singer",
            "date": "1988"
        };
        let fakeSuccesResponse = {status: 200, message: 'Event updated!', length: 6, event: fakeEvent};
        chai.request(server)
            .put('/events/68819422197e5f1ddcc24903a84594677c687e701c623cd282cd59d8e5e4df2b')
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
            "id": "68819422197e5f1ddcc24903a84594677c687e701c623cd282cd59d8e5e4df2b",
            "title": "Duaplipa",
            "description": "Female Singer",
            "date": "1988"
        };
        let fakeSuccesResponse = {status: 200, message: 'Event deleted!', length: 5, event: fakeEvent};
        chai.request(server)
            .delete('/events/68819422197e5f1ddcc24903a84594677c687e701c623cd282cd59d8e5e4df2b')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.eql(fakeSuccesResponse);
                done();
        })
    });
});