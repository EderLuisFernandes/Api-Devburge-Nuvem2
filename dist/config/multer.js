"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _uuid = require('uuid');

var _nodepath = require('node:path');

exports. default = {
   storage: _multer2.default.diskStorage({
    destination:_nodepath.resolve.call(void 0, __dirname,'..','..','uploads'),
    filename: (request , file, callback) => {
        return callback(null , _uuid.v4.call(void 0, ) + _nodepath.extname.call(void 0, file.originalname))
    }
   })
}