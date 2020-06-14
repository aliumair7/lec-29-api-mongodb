var mongoose=require('mongoose')
var joi=require('@hapi/joi')

var schema_product=mongoose.Schema({
    name:String,
    price:Number
})

var product_model=mongoose.model('products',schema_product)

function validate_product(data){
    const schema=joi.object({
        name: joi.string().min(3).max(12).required(),
        price:joi.number().min(0).required()
    })
    return schema.validate(data,{abortEarly:false});
}

module.exports.Product=product_model;
module.exports.validate=validate_product;