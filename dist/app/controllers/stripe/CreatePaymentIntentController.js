"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _stripe = require('stripe'); var _stripe2 = _interopRequireDefault(_stripe);
const stripe = new (0, _stripe2.default)(process.env.STRIPE_SECRET_KEY || 'sk_test_51Q9vPOJzRvprckx0IPZ4GBurL0YMYd35X8nl4MXM5cMwDsnoR6vYsp2PgLjiMIB2uiuxQIQQKaKkzc9nbPi1EgKC00Uw1D3CDO');
require('dotenv/config');


const calculateOrderAmout = (items)=>{
    const total = items.reduce((acc, current) =>{
        return current.price * current.quantity + acc;
    }, 0);

    return total;
}


if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Chave do Stripe não foi carregada');
}


class CreatePaymentIntentController{
async store(request,response){
    const Schema = Yup.object({
        products: Yup.array().required().of(
            Yup.object({
                id: Yup.number().required(),
                quantity: Yup.number().required(),
                price: Yup.number().required(),

            })
        ),
        
      });
      try{
        Schema.validateSync(request.body,{abortEarly:false})
      }catch(err){
        return response.status(400).json({ error: err.errors})
      }
      const {products} = request.body
        const amount = calculateOrderAmout(products);

        
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "brl",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  response.json({
    clientSecret: paymentIntent.client_secret,
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });

    }

}

exports. default = new CreatePaymentIntentController()