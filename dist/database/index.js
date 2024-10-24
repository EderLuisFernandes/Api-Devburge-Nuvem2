"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Product = require('../app/models/Product'); var _Product2 = _interopRequireDefault(_Product);
var _Category = require('../app/models/Category'); var _Category2 = _interopRequireDefault(_Category);

const models = [_User2.default, _Product2.default,_Category2.default]

class Database{
    constructor(){

        this.init();
        this.mongo();
    }
    init(){
        this.connection = new (0, _sequelize2.default)('postgresql://postgres:DRSASVHrQxCkJGbvFCeKHcEtNZmUospP@junction.proxy.rlwy.net:32676/railway');
        models.map((model) => model.init(this.connection)).map(model => model.associate && model.associate(this.connection.models),);
    }

    mongo(){
        this.mongoConnection = _mongoose2.default.connect('mongodb://mongo:JoaHPJuumFSyRkdFfSHtqxCKBPDGcyvr@junction.proxy.rlwy.net:51323');
    }
}


exports. default = new Database();