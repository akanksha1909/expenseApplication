const express = require('express');
const expenseRouter = express.Router();

const validator = require('../helpers/validator.js');

const expenseController = require('../controllers/expenseController.js');

// Router function to create or edit expenses
expenseRouter.post('/create', (req, res, next) => {
    validator.validate(req, res, next, ['title', 'notes', 'amount', 'tags'])
}, function (req, res) {
    if (req.body._id) {
        expenseController.editExpense(req, res);
    } else {
        expenseController.addExpense(req, res);
    }
});

// Router function to search for an expense by title,tags or notes
expenseRouter.post('/search', function (req, res) {
    expenseController.searchExpense(req, res);
});

//Router function to delete particular expense
expenseRouter.delete('/delete/:_id', function (req, res) {
    expenseController.deleteExpense(req, res);
});

//Router function to get All expenses or particular expense
expenseRouter.get('/:expenseid?', function (req, res) {
    if (req.params.expenseid) {
        expenseController.getParticularExpense(req, res);
    } else {
        expenseController.getExpenses(req, res);
    }
});
module.exports = expenseRouter;