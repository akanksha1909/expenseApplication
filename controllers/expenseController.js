const _ = require('lodash');
const mongoose = require('mongoose');
const __ = require('../helpers/response');
const expenseModel = require('../models/expenseModel.js');

class expense {
    async getExpenses(req, res, status) {
        try {
            let expenseData = await expenseModel.find({}).select('notes title tags amount created_at').sort({ 'created_at': -1 }).lean();
            let message = 'All Expenses listed';
            switch (status) {
                case 1: {
                    message = 'Expenses Added Successfully';
                    break;
                }
                case 2: {
                    message: 'Expenses Updated Successfully';
                    break;
                }
                case 3: {
                    message: 'Expenses Deleted Successfully';
                    break;
                }
                default:
                    break;
            }
            if (_.size(expenseData) > 0) {
                __.success(res, expenseData, message);
            } else {
                __.notFound(res, 'No expenses\'s available');
            }
        } catch (error) {
            __.errorInternal(res, error);
        }

    }
    async addExpense(req, res) {
        try {
            let temp = {
                notes: req.body.notes,
                title: req.body.title,
                amount: req.body.amount,
                tags: req.body.tags
            }
            temp.tags = req.body.tags;

            let expensecreate = await expenseModel.create(temp);
            this.getExpenses(req, res, 1);
        } catch (error) {
            __.errorInternal(res, error);
        }
    }
    async editExpense(req, res) {
        try {
            let getexpense = await expenseModel.findOneAndUpdate({ _id: req.body._id }, { title: req.body.title, amount: req.body.amount, notes: req.body.notes, tags: req.body.tags });
            if (!getexpense) {
                return __.notFound(res, "Expenses doesn't exist");
            }
            return this.getExpenses(req, res, 2);
        } catch (error) {
            __.errorInternal(res, error);
        }
    }
    async getParticularExpense(req, res) {
        try {
            let getexpense = await expenseModel.findOne({ _id: req.params.expenseid }).select('notes title tags amount created_at');
            if (!getexpense) {
                return __.notFound(res, "Expenses doesn't exist");
            }
            __.success(res, getexpense, 'Details of particular expense');
        } catch (error) {
            __.errorInternal(res, error);
        }
    }

    async deleteExpense(req, res) {
        try {
            if (mongoose.Types.ObjectId.isValid(req.params._id) === true) {
                let deleteexpense = await expenseModel.findOne({ _id: req.params._id }).remove().exec();
                return this.getExpenses(req, res, 3);
            } else {
                return __.notFound(res, "Expenses doesn't exist");
            }
        } catch (error) {
            __.errorInternal(res, error);
        }
    }
    async searchExpense(req, res) {
        try {
            var search = new RegExp("^" + req.body.search + "$", "i");
            let searchexpense = await expenseModel.find({
                '$or': [{ "tags": { "$in": [search] } },
                { 'title': { '$regex': search } },
                { 'notes': { '$regex': search } }]
            })
            if (!searchexpense) {
                return __.notFound(res, "Expenses doesn't exist");
            }
            __.success(res, searchexpense, 'Details of expenses');
        } catch (error) {
            __.errorInternal(res, error);
        }
    }
}
expense = new expense();
module.exports = expense;