const __ = require('./response.js');
class validator{
    validate(req,res,next,arrayOfStrings){
        arrayOfStrings.map((v ,k)=>{
            if(req.body[v] === null || req.body[v] === undefined || req.body[v] === "" ){
                req.error = "Bad Values";
                console.log("Parameter missing => " + v);
            }
        })
        if(typeof req.body.amount != 'number'){
            __.notAuthorized(res,'Amount should be a Number');
        }
        else if(req.error){
            __.badValues(res);
        }else{
            next();
        }
    }
}

validator = new validator();
module.exports = validator;