"use strict";const { underscoredIf } = require("sequelize/lib/utils");

module.exports = {
    dialect: 'postgres',
    url: 'postgresql://postgres:DRSASVHrQxCkJGbvFCeKHcEtNZmUospP@junction.proxy.rlwy.net:32676/railway'
,
    define:{
        timestamps: true,
        underscored:true,
        underscoredAll: true,
    },

}