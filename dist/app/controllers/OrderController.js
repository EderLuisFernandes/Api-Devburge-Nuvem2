"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Order = require('../schemas/Order'); var _Order2 = _interopRequireDefault(_Order);
var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);
var _Category = require('../models/Category'); var _Category2 = _interopRequireDefault(_Category);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);


class OrderController{
 async store(request,response){
  const Schema = Yup.object({
    products: Yup.array().required().of(
        Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required()
        })
    ),
    
  });
 
  

  try{
    Schema.validateSync(request.body,{abortEarly:false})
  }catch(err){
    return response.status(400).json({ error: err.errors})
  }

  
  const { products} = request.body;
  
  const productsIds = products.map((product) =>product.id)

  const findProducts = await _Product2.default.findAll({
    where:{
      id: productsIds,
    },
    include:[
      {
        model: _Category2.default,
        as: 'category',
        attributes: ['name'],
      }
    ]
  })


const formattedProducts = findProducts.map((product) =>{
  const productIndex = products.findIndex((item) => item.id === product.id)
  const newProduct = {
    id: product.id,
    name: product.name,
    category: product.category.name,
    price: product.price,
    url: product.url,
    quantity: products[productIndex].quantity,
  };
  return newProduct
})
  const order = {
    user:{
        id: request.userId,
        name: request.userName,
    },
    products: formattedProducts,
    status: 'Pedido Realizado',
  };
  const  createdOrder = await _Order2.default.create(order)
  return response.status(201).json(createdOrder)
}
async index(request, response){
 const orders = await _Order2.default.find();
 
 return response.json(orders)
}
async update(request,response){
  const Schema = Yup.object({
    status: Yup.string().required(), 
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

  const {id} = request.params;
  const {status} = request.body;
try{
await _Order2.default.updateOne({_id: id},{status});
}catch(err){
 return response.json({error: 'Pedido não encontrado'})
}
  
  return response.json({message:'Status atualizado com Sucesso!'})
}


  
 }


exports. default = new OrderController()