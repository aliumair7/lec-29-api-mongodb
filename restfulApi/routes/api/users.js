var express = require('express');
var router = express.Router();
var {User}=require('../../models/users_model')
var bcrypt=require('bcryptjs')

var _=require('lodash')
var jwt=require('jsonwebtoken')
var config=require('config')

router.post('/register',async(req,res)=>{
    let user=await User.findOne({email:req.body.email})
    if(user) return res.status(400).send("User with this email already exists")
    let users= new User()
    users.name=req.body.name
    users.email=req.body.email
    users.password=req.body.password
   await users.createHashPassword();
    await users.save()
   return  res.send(_.pick(users,['name','email']))
})

router.post('/login',async (req,res)=>{
    let user=await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("User with this email Not exists")
    let isValid=await bcrypt.compare(req.body.password,user.password)
    if(!isValid) return res.status(400).send("Not Valid Password")
    let token=await jwt.sign({_id:user.id,name:user.name}
    ,config.get("jwtPrivateKey"))

    return res.send(token)
})


module.exports = router;
