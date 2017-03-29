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