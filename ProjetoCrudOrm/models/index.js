const Sequelize = require('sequelize')
const sequelize = new Sequelize('cadastro-orm', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})
const models = {}
const fs = require('fs')
const path = require('path')

fs
    .readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach((file) => {
        const model = require(path.join(__dirname, '/', file))(sequelize, Sequelize)
        models[model.name] = model;
    })
Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models)
    }
})

module.exports = {
    sequelize,
    models
}