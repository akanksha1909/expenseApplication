const assert = require('assert');
const chai = require('chai');
const _ = require('lodash');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app.js');


chai.use(chaiHttp);

describe('Get all expenses', function () {
    it('should list expense', function (done) {
        chai.request(server).get('/expenses').end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            _.map(res.body.data, function (o) {
                o.should.have.property('notes');
                o.should.have.property('title');
                o.should.have.property('amount');
                o.should.have.property('tags');
                o.notes.should.be.a('string');
                o.title.should.be.a('string');
                o.amount.should.be.a('number');
                o.tags.should.be.a('array');
            });
            _id = res.body.data[0]._id;
            done();
        })
    })
})

describe('Create Expenses', function () {
    it('should create expense', function (done) {
        let expense = {
            notes: 'purchases books',
            title: 'books',
            amount: 100,
            tags: ['studystuff', 'maths']
        }
        chai.request(server).post('/expenses/create').send(expense).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            _.map(res.body.data, function (o) {
                o.should.have.property('notes');
                o.should.have.property('title');
                o.should.have.property('amount');
                o.should.have.property('tags');
                o.notes.should.be.a('string');
                o.amount.should.be.a('number');
                o.title.should.be.a('string');
                o.tags.should.be.a('array');
            });
            done();
        })
    })
})
describe('Search Expenses', function () {
    it('should search expenses', function (done) {
        let expense = {
            search: 'coffee'
        }
        chai.request(server).post('/expenses/search').send(expense).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            _.map(res.body.data, function (o) {
                o.notes.should.be.a('string');
            });
            done();
        })
    })
})

describe('Delete expenses', function () {
    it('should delete expense', function (done) {
        chai.request(server).delete('/expenses/delete/' + _id).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            _.map(res.body.data, function (o) {
                o.should.have.property('notes');
                o.should.have.property('title');
                o.should.have.property('amount');
                o.should.have.property('tags');
                o.notes.should.be.a('string');
                o.amount.should.be.a('number');
                o.title.should.be.a('string');
                o.tags.should.be.a('array');
            });
            done();
        })
    })
})