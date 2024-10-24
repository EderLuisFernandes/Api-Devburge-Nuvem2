const { underscoredIf } = require("sequelize/lib/utils");

module.exports = {
    dialect: 'postgres',
    url: 'postgresql://postgres:HYfDLtsqbSJHiAdOJkfZtMSxmNJreymt@autorack.proxy.rlwy.net:38108/railway'
,
    define:{
        timestamps: true,
        underscored:true,
        underscoredAll: true,
    },

}