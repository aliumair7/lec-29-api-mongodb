var jwt=require('jsonwebtoken')
var config=require('config')
var {User}=require('../models/users_model')
async function auth(req,res,next) {
     let token=req.header("x-head-token")
     if(!token) return res.status(400).send("Token Not Exists")
    try {
        let user=jwt.verify(token,config.get("jwtPrivateKey"))
     req.user=await User.findById(user._id)
        
    } catch (error) {
        return res.status(401).send("Invalid Token")
        
    } 
    next()
}
module.exports=auth;