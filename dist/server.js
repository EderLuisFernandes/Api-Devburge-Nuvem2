"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
const port = process.env.PORT || 3001
_app2.default.listen(port,'0.0.0.0', () => console.log('Servidor on 😎....3001'))