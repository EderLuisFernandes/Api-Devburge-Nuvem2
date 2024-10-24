import  Sequelize  from "sequelize";
import mongoose from "mongoose";
import configDatabase from '../config/database';

import User from "../app/models/User";
import Product from "../app/models/Product";
import Category from "../app/models/Category";

const models = [User, Product,Category]

class Database{
    constructor(){

        this.init();
        this.mongo();
    }
    init(){
        this.connection = new Sequelize('postgresql://postgres:DRSASVHrQxCkJGbvFCeKHcEtNZmUospP@junction.proxy.rlwy.net:32676/railway');
        models.map((model) => model.init(this.connection)).map(model => model.associate && model.associate(this.connection.models),);
    }

    mongo(){
        this.mongoConnection = mongoose.connect('mongodb://mongo:JoaHPJuumFSyRkdFfSHtqxCKBPDGcyvr@junction.proxy.rlwy.net:51323');
    }
}

export default new Database();