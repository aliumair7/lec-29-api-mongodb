var {validate}=require('../models/productmodel')
function validaton(req,res,next){
    let {error}=validate(req.body)
    if (error) return res.send(error.details[0].message)
    next()

}
module.exports=validaton;