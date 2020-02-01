//MONGODB PASSWORD: TYOxYptbMKwX6zcb
//CONECTION STRING: mongodb+srv://MrDan:<password>@cluster0-77ixp.mongodb.net/test?retryWrites=true&w=majority


const express = require('express')
const http = require('http')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const customerRoutes = require('./server/routes/customer')
const statesRoutes = require('./server/routes/states')

//connect to mongodb
mongoose.connect('mongodb+srv://MrDan:TYOxYptbMKwX6zcb@cluster0-77ixp.mongodb.net/test?retryWrites=true&w=majority')
         .then(() => {
          console.log('App succesfully connect to database!!')
         }).catch((error) => {
          console.log('Unable to connect to mongoDB');
          console.error(error)
         })


const port = 5000;
const app = express()

// Add middleware 
app.use((req, res, next) => {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
 next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/customers', customerRoutes);
app.use('/api/states', statesRoutes)


//set public resources
app.use(express.static(__dirname + '/dist'))

app.get('/*', (req, res) => {
 res.sendFile(path.join(__dirname, 'dist/Angular-Large-Customer-App/index.html'));
})


const server = http.createServer(app)
server.listen(process.env.PORT || port, () => {
 console.log('Express listening on port' + port)
});

// app.set('port', process.env.PORT || 4200)
