const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cadastro'
    }
}, app.listen(port, () => console.log('CRUD listening on port: ' + port)))

const pessoas = require('./routes/pessoas')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))

app.get('/', (req, res) => res.render('home'))
app.use('/pessoas', pessoas(knex))

//view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


