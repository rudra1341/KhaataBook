const { name } = require('ejs');
const mongoose=require('mongoose')
const Joi = require('joi');
const userSchema=mongoose.Schema({
     name: {
    type: String,
    required: true,
    trim: true,
    minLength:3
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},{ timestamps: true });

function validateModel(data){
  let schema=Joi.object({
  name:Joi.string().min(3).trim().required(),
  email:Joi.string().email().trim().required(),
  password:Joi.string().min(6).trim().required(),
   confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    
  'any.only': 'Passwords do not match'

   })
  })
  let{error,value}=schema.validate(data);
  return {error,value};
}
function validateLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  });
  return schema.validate(data);
}
let user=mongoose.model('user',userSchema);
module.exports={validateModel,user,validateLogin}