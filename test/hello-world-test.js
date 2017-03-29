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