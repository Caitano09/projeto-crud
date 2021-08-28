const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const pessoas = require('./routes/pessoas')
const model = require('./models/index')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res)=> res.render('index'))

app.use('/pessoas', pessoas)
app.use(express.static(path.join(__dirname, 'public')))

model.sequelize.sync({force: false}).then(() =>{
    app.listen(port, () => console.log('CRUD ORM listening...'))
})
