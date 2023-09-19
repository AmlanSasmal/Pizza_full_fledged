require('dotenv').config()
const express = require('express');
const ejs = require('ejs')
const expresslayout = require('express-ejs-layouts')
const mongoose = require('mongoose');

const flash = require('express-flash');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const passport=require('passport');

//  new MongoDbStore(session)//to store cookie in db

const path = require('path')

const app = express();

const PORT = process.env.PORT || 4000
const connection = mongoose.connection;


const mongoClientPromise = new Promise((resolve) => {
    mongoose.connection.on("connected", () => {
        const client = mongoose.connection.getClient();
        resolve(client);
    });
});

//session config
MONGO_URI='mongodb://127.0.0.1:27017/pizza'
app.use(session({
    secret: '$secret!',
    resave: false,
    store: MongoStore.create({
        clientPromise:mongoClientPromise,
        dbName: 'pizza'
      }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours

}))

//passport config
app.use(require('express-session')({ 
    secret: 'Enter your secret key',
    resave: true,
    saveUninitialized: true
  }));
const passportInit=require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session())


app.use(flash()); 
 app.use(express.urlencoded({extended:false}));
app.use(express.json());

// assets 

app.use(express.static('public'))


//global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session;
    res.locals.user=req.user;
    next()
})

//set template engine

app.use(expresslayout)

app.set('views', path.join(__dirname, '/resources/views'))

app.set('view engine', 'ejs')


require('./routes/web')(app)

const { stripVTControlCharacters } = require('util');
const { Session } = require('inspector');
const { log } = require('console');




// connect to database 

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/pizza').then(() => console.log("connected")).catch((err) => {
        console.log(`unable to connect with the server ${err}`);
    })
}



app.listen(PORT, () => {
    console.log(`listening on port  ${PORT} `);
})