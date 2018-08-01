const _ = require('lodash');
const mongoose = require('mongoose');
const __ = require('../helpers/response');
const bookmarkModel = require('../models/bookmark.js');
const userModel  = require('../models/user.js');

class bookmark{
    async getBookmarks(req,res,status){
        try{
            let bookmarkget = await bookmarkModel.find({user : req.user._id}).select('url title tags').sort({'created_at':-1}).lean();
            let message = 'All bookmarks listed';
            if(status == 1) message = 'Bookmark successfuly added';
            if(status == 2) message = 'Bookmark succesfuly updated';
            if(status == 3) message = 'Bookmark succesfuly deleted';
            if(_.size(bookmarkget) > 0){
                __.success(res,bookmarkget,message);
            }else{
                __.notFound(res,'No bookmark\'s available');
            }
        }catch(error){
            __.errorInternal(res,error);
        }
     
    }
    async addBookmark(req,res){
        try {
            let temp = {
                user : req.user._id,
                title : req.body.title,
                url : req.body.url
            }
            temp.tags = req.body.tags;
            let bookmarkcreate = await bookmarkModel.create(temp);
            this.getBookmarks(req,res,1);
        }catch(error){
            __.errorInternal(res,error);
        }
    }
    async editBookmark(req,res){
        try{
            let getbookmark = await bookmarkModel.findOneAndUpdate({_id : req.body._id},{title : req.body.title,url:req.body.url,tags : req.body.tags});
            if(!getbookmark){
                return __.notFound(res,"Bookmark doesn't exist");
            }
            return this.getBookmarks(req,res,2);
        }catch(error){
            __.errorInternal(res,error);
        }
    }
    async deleteBookmark(req,res){
        try{
            if(mongoose.Types.ObjectId.isValid(req.params._id) === true){
                let deletebookmark = await bookmarkModel.findOne({_id : req.params._id}).remove().exec();
                return this.getBookmarks(req,res,3);
            }else{
                return __.notFound(res,"Bookmark doesn't exist");      
            }
        }catch(error){
            __.errorInternal(res,error);
        }
    }
}   
bookmark = new bookmark();
module.exports = bookmark;