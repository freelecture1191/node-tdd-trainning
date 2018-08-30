const assert = require('assert')
const should = require('should')
const request = require('supertest')
// const app = require('../routes/users')
const app = require('../app')

/*
describe('GET /users', () => {
  it('배열을 반환한다', () => {
    // assert.equal(1,0)
    (1).should.equal(1)
  })
})
*/

describe('GET /users', () => {
  describe('성공', () => {
    it('배열을 반환한다', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array); //응답값이 배열인지 체크
          res.body.forEach(user => {
            user.should.have.property('name') //응답값의 키값이 `name`인지
          })
          done()
        })
    })
    it('최대 limit 갯수만큼 응답한다', done => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2)
          done()
        })
    })
  })

  describe('실패', () => {
    it('limit이 정수가 아니면 400을 응답한다', done => {
      request(app)
        .get('/users?limit=two')
        .expect(400)
        .end(done)
    })
  })
})

describe('GET /users/:id', () => {
  describe('성공', () => {
    it('유저 객체를 반환한다', done => {
      request(app)
        .get('/users/1')
        .end((err, res) => {
          res.body.should.have.property('id', 1)
          done()
        })
    })
  })
  describe('실패', () => {
    it('id가 숫자가 아닐경우 400 응답')
  })
})