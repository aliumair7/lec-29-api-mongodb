var mongoose=require('mongoose')
var joi=require('@hapi/joi')
var bcrypt = require('bcryptjs');

var schema_user=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role :{
        type:String,
        default:"user"

    }
})

schema_user.methods.createHashPassword=async function(){
    let salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
}

var user_model=mongoose.model('users',schema_user)

function validate_user(data){
    const schema=joi.object({
        name: joi.string().min(3).max(12).required(),
        email:joi.string().email().min(3).max(12).required(),
        password:joi.string().min(3).max(10).required()
    })
    return schema.validate(data,{abortEarly:false});
}
function validate_login(data){
    const schema=joi.object({
        
        email:joi.string().email().min(3).max(12).required(),
        password:joi.string().min(3).max(10).required()
    })
    return schema.validate(data,{abortEarly:false});
}
module.exports.User=user_model;
module.exports.User_Register=validate_user;
module.exports.User_Login=validate_login;