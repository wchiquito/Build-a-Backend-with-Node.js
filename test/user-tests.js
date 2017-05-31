const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const dbController = require('../models/dbController');


chai.use(chaiHttp);

describe('Hello User-Tests!', () => {
    it('Sanity test', () => assert.equal( true , 1 === 1 , "Everything is alright!"));
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

describe('User should be redirect succesfully to requested resource when logs in correctly', () => {

});

describe('User should be promted with an error when tries to logs in incorrectly', () => {

});

