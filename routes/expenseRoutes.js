const express = require('express');
const bookmarkerRouter = express.Router();

const validator = require('../helpers/validator.js');
const auth = require('../helpers/auth.js');

const bookmarkController = require('../controllers/bookmarkController.js');

bookmarkerRouter.post('/create',auth.authenticate,(req,res,next) =>{
    validator.validate(req,res,next,['title','url','tags'])
},function(req,res){
    if(req.body._id){
        bookmarkController.editBookmark(req,res);
    }else{
        bookmarkController.addBookmark(req,res);
    }
});
bookmarkerRouter.delete('/delete/:_id',auth.authenticate,function(req,res){
    bookmarkController.deleteBookmark(req,res);
});
bookmarkerRouter.get('/',auth.authenticate,function(req,res){
    bookmarkController.getBookmarks(req,res);
});
module.exports = bookmarkerRouter;