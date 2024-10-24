"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);


const OderSchema = new _mongoose2.default.Schema({
    user:{
        id:{
            type: String,
            required: true,
        },
        name:{
            type: String,
            required:true,
        }
    },
    products:[
        {
            id:{
                type: Number,
                required: true,
            },
            name:{
               type: String,
               required:true, 
            },
            price:{
                type: Number,
                required: true,
            },
            category:{
                type: String,
                required: true,
            },
            url: {
         type :String,
         required:true,
            },
            quantity:{
                type: String,
                required: true
            }
        }
    ],
    status :{
        type: String,
        required: true,
    }
},{
    timestamps: true,
})

exports. default = _mongoose2.default.model('Order', OderSchema);