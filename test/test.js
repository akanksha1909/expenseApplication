const assert = require('assert');
const chai = require('chai');
const _ = require('lodash');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app.js');


chai.use(chaiHttp);

describe('Get all expenses', function () {
    it('List expenses', function (done) {
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
    it('Expense created', function (done) {
        let expense = {
            notes: 'purchases books',
            title: 'books',
            amount: 100,
            tags: ['studystuff', 'maths']
        }
        chai.request(server).post('/expenses/create').send(expense).end((err, res) => {
            console.log(res.body.should);
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

describe('Delete expenses', function () {
    it('Expense deleted', function (done) {
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