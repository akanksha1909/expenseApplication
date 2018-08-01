const express = require('express');
const expenseRouter = express.Router();

const validator = require('../helpers/validator.js');

const expenseController = require('../controllers/expenseController.js');

expenseRouter.post('/create',(req,res,next) =>{
    validator.validate(req,res,next,['title','notes','amount','tags'])
},function(req,res){
    if(req.body._id){
        expenseController.editExpense(req,res);
    }else{
        expenseController.addExpense(req,res);
    }
});
expenseRouter.delete('/delete/:_id',function(req,res){
    expenseController.deleteExpense(req,res);
});
expenseRouter.get('/:expenseid?',function(req,res){
    console.log(req.params.expenseid);
    if(req.params.expenseid){
        expenseController.getParticularExpense(req,res);   
    }else{
        expenseController.getExpenses(req,res);
    }
});
module.exports = expenseRouter;