// //MONGODB PASSWORD: TYOxYptbMKwX6zcb
// //CONECTION STRING: mongodb+srv://MrDan:<password>@cluster0-77ixp.mongodb.net/test?retryWrites=true&w=majority

// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express()
// const mongoose = require('mongoose')
// const path = require('path')

// const customerRoutes = require('./routes/customer')
// const statesRoutes = require('./routes/states')


// mongoose.connect('mongodb+srv://MrDan:TYOxYptbMKwX6zcb@cluster0-77ixp.mongodb.net/test?retryWrites=true&w=majority')
//          .then(() => {
//           console.log('App succesfully connect to database!!')
//          }).catch((error) => {
//           console.log('Unable to connect to mongoDB');
//           console.error(error)
//          })

// app.use((req, res, next) => {
//  res.setHeader('Access-Control-Allow-Origin', '*');
//  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//  next();
// });

// app.use(express.static(path.join(__dirname, '/dist/Angular-Large-Customer-App')))
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json());
// app.use('/api/customers', customerRoutes);
// app.use('/api/states', statesRoutes)
// app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname, '/dist/Angular-Large-Customer-App/index.html'));
// })

// module.exports = app

