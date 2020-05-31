
function admin(req,res,next){
    if( req.user.role !="admin") 
    return res.status(400).send("Not Autherized")


    next()
}
module.exports=admin;