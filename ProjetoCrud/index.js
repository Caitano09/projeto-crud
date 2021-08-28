const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const mysql = require('mysql')
const bodyParser = require('body-parser')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cadastro',
})
const dependencies = {
    connection
}

const pessoas = require('./routes/pessoas')
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('public'))

app.get('/', (req, res) =>res.render('home'))
app.use('/pessoas', pessoas(dependencies))

//view engine
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')


connection.connect((err)=>{
    app.listen(port, ()=>console.log('CRUD listening on port: '+port))
})
