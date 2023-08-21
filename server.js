const express = require('express');
const ejs = require('ejs')
const expresslayout = require('express-ejs-layouts')

const path = require('path')

const app = express();

const PORT = process.env.PORT || 4000


// assets 

app.use(express.static('public'))




//set template engine

app.use(expresslayout)

app.set('views', path.join(__dirname, '/resources/views'))

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('home')
})


app.get('/cart', (req, res) => {
    res.render('customers/cart')
})



app.listen(PORT, () => {
    console.log(`listening on port  ${PORT} `);
})


