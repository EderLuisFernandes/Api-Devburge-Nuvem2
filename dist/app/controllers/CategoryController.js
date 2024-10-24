"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Category = require('../models/Category'); var _Category2 = _interopRequireDefault(_Category);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);


class CategoryController{
 async store(request,response){
  const Schema = Yup.object({
    name: Yup.string().required(),
    
  });
  try{
    Schema.validateSync(request.body,{abortEarly:false})
  }catch(err){
    return response.status(400).json({ error: err.errors})
  }
  const  { admin: isAdmin} = await _User2.default.findByPk(request.userId)
  if(!isAdmin){
    return response.status(401).json({message: "Voce não é administrador"})
  }
 const {filename: path} = request.file
  const { name} = request.body;
  const categoryExist =await _Category2.default.findOne({
    where: {
      name,
    }
  })
   if(categoryExist){
    return response.status(400).json({error: 'Categoria ja Existe'})
   }
  const {id} = await _Category2.default.create({
    name,
    path,
  })
  return response.status(201).json({id ,name})
 }
 async index(request,response){
  const category = await _Category2.default.findAll()

  return response.json(category)
 }
 async update(request,response){
  const Schema = Yup.object({
    name: Yup.string(),
  });
  try{
    Schema.validateSync(request.body,{abortEarly:false})
  }catch(err){
    return response.status(400).json({ error: err.errors})
  }

  const  { admin: isAdmin} = await _User2.default.findByPk(request.userId)
  if(!isAdmin){
    return response.status(401).json({message: "Voce não é administrador"})
  }
  const {id} =request.params

  const categoryExists =  await _Category2.default.findByPk(id)

  if(!categoryExists){
    return response.status(400).json({message:'Seu id de Categoria não esta correto. '})
  }

  let path;
  if(request.file){
    path = request.file.filename
  }
  
  const { name} = request.body;
 if(name){
  const categoryNameExist =await _Category2.default.findOne({
    where: {
      name, 
    }
  })
  if(categoryNameExist && categoryNameExist.id !== +id){
    return response.status(400).json({error: 'Categoria ja Existe'})
   }
 }
   
  await _Category2.default.update({
    name,
    path,
  },{
      where:{
        id,
      }
    })
    return response.status(200).json()
 }  
}

exports. default = new CategoryController()