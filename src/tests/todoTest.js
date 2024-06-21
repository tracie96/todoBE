const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('Todo API', () => {
  describe('POST /api/todos', () => {
    it('should create a new todo', (done) => {
      request(app)
        .post('/api/todos')
        .send({ title: 'New Todo' })
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.include({ title: 'New Todo', completed: false });
          done(err);
        });
    });
  });

  describe('GET /api/todos', () => {
    it('should retrieve all todos', (done) => {
      request(app)
        .get('/api/todos')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done(err);
        });
    });
  });

  describe('PUT /api/todos/:id', () => {
    let todoId;

    beforeEach((done) => {
      request(app)
        .post('/api/todos')
        .send({ title: 'Another New Todo' })
        .end((err, res) => {
          todoId = res.body.id;
          done(err);
        });
    });

    it('should update a todo', (done) => {
      request(app)
        .put(`/api/todos/${todoId}`)
        .send({ completed: true })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include({ id: todoId, completed: true });
          done(err);
        });
    });
  });

  describe('DELETE /api/todos/:id', () => {
    let todoId;

    beforeEach((done) => {
      request(app)
        .post('/api/todos')
        .send({ title: 'Todo to Delete' })
        .end((err, res) => {
          todoId = res.body.id;
          done(err);
        });
    });

    it('should delete a todo', (done) => {
      request(app)
        .delete(`/api/todos/${todoId}`)
        .expect(204, done);
    });
  });
});
