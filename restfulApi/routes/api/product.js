var express = require('express');
var router = express.Router();
var {Product,validate}=require('../../models/productmodel')
var valiadtor=require('../../middlewares/product_validate')
var auth=require('../../middlewares/auth')
var admin=require('../../middlewares/admin')



//Get all Product

router.get('/',auth,admin,async (req,res)=>{
    console.log(req.user)
    let page=Number( req.query.page? req.query.page:10);
    let per_Page=Number(req.query.per_Page? req.query.per_Page:2);
    let skip_page=(per_Page*(page-1))
    var product=await Product.find().skip(skip_page).limit(per_Page)
    return res.send(product)
})
router.get('/:id',async (req,res)=>{
    try {
        var product=await Product.findById(req.params.id)
        
        return res.send(product)
        
        
    } catch (error) {

        res.status(400).send("Not correct format")
    }    
})

router.put('/:id',valiadtor,async (req,res)=>{
    var product=await  Product.findById(req.params.id)
    product.name=req.body.name
    product.price=req.body.price
    product.save()
    

    return res.send(product)
})
router.delete('/:id',async (req,res)=>{
    var product=await  Product.findByIdAndDelete(req.params.id)
    
    

    return res.send(product)
})

router.post('/',valiadtor,async (req,res)=>{
    
    var product=await new  Product()
    product.name=req.body.name
    product.price=req.body.price
    product.save()
    

    return res.send(product)
})


module.exports = router;
