"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _auth = require('./app/middleware/auth'); var _auth2 = _interopRequireDefault(_auth);

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _ProductController = require('./app/controllers/ProductController'); var _ProductController2 = _interopRequireDefault(_ProductController);
var _CategoryController = require('./app/controllers/CategoryController'); var _CategoryController2 = _interopRequireDefault(_CategoryController);
var _OrderController = require('./app/controllers/OrderController'); var _OrderController2 = _interopRequireDefault(_OrderController);

var _CreatePaymentIntentController = require('./app/controllers/stripe/CreatePaymentIntentController'); var _CreatePaymentIntentController2 = _interopRequireDefault(_CreatePaymentIntentController);

const routes = new (0, _express.Router)()
const upload = _multer2.default.call(void 0, _multer4.default)
routes.get('/',(request, response)=>{

    return response.json({message:'Bem vindo ao Back-end - DevBurger'})
})
routes.post('/users', _UserController2.default.store)
routes.post('/session', _SessionController2.default.store)

routes.use(_auth2.default);

routes.post('/products', upload.single('file') , _ProductController2.default.store)
routes.get('/products', _ProductController2.default.index)
routes.put('/products/:id', upload.single('file'), _ProductController2.default.update)


routes.post ('/categories',upload.single('file'), _CategoryController2.default.store);
routes.get ('/categories', _CategoryController2.default.index);
routes.put('/categories/:id', upload.single('file'), _CategoryController2.default.update)

routes.post('/orders', _OrderController2.default.store);
routes.get('/orders', _OrderController2.default.index); 
routes.put('/orders/:id', _OrderController2.default.update);

routes.post('/create-payment-intent' , _CreatePaymentIntentController2.default.store )




exports. default = routes