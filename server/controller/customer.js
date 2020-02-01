const Customer = require('../models/customer')
const State = require('../models/states')

//To get one Customer//
exports.getCustomer = (req, res) => {
  console.log('get one customer reaches')
  const custId = +req.params.id

  Customer.findOne({ id : custId })
          .then((customer) => {
            res.status(200).json(customer)
          }).catch((error) => {
            res.status(404).json({
              error: error
            })
     })
}

//To  Update a Customer//
exports.updateCustomer = (req, res) => {
  console.log('Gotten to Update customer')

  if(!req.body){
    throw new Error('Customer and associated stateId required');
  }

  console.log(req.body.state.name)
  console.log(req.body.state.abbreviation)
  // const newState = new State({  })

  const customer = new Customer({
    id: +req.params.id,
    firstName: req.body.firstName,
    lastName:req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    state: {
      name : req.body.state.name
    }
  })

  Customer.updateOne({ id: +req.params.id }, 
    { $set: {
      id : +req.params.id,
      firstName: req.body.firstName,
      lastName:req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      state: {
        name : req.body.state.name,
        abbreviation: req.body.state.abbreviation
    }
    } 
  })
    .then(() => {
      res.status(201).json({
        message: 'Updated succesfully'
      })
    }).catch((error) => {
      res.status(400).json({
        error: error
      })
    }) 
}

// app.put("/api/inventory/:sku", (req, res, next) => {
//   return Inventory.updateOne(
//     { sku: req.params.sku },  // <-- find stage
//     { $set: {                // <-- set stage
//        id: req.body.id,     // <-- id not _id
//        sku: req.body.sku,
//        total_qty: req.body.total_qty,
//        current_qty: req.body.current_qty
//       } 
//     }   
//   ).then(result => {
//     res.status(200).json({ message: "Update successful!" });
//   });
// });

exports.getCustomerPage = ( req, res) => {
  const skip = +req.params.skip
        top = +req.params.top;
   console.log('reached get one page')
   Customer.count((err, customerCount) => {
   let count = customerCount;
   console.log(count);

   Customer.find({})
           .sort({ id : 1 })
           .skip(skip)
           .limit(top)
           .exec((err, customers) => {
            res.setHeader('X-InlineCount', count )
                if(err) {
                 console.log(`get customer page error: ${err}`)
                 res.status(400).json(err)
                } else {
                    console.log('getCustomerPage ok!')
                    res.status(200).json(customers)
                }
           })

 })
}

//To Insert a Customer
exports.insertCustomer = (req, res) => {
  console.log('there are no pple')
 const customer = new Customer({
   firstName: req.body.firstName,
   lastName:req.body.lastName,
   address: req.body.address,
   city: req.body.city,
   state: req.body.state
 })
 customer.save()
     .then(() => {
          res.json({
            message: 'post success'
          })
          console.log('saved sucessfuly')
     }).catch((error) => {
          res.status(400).json({
           error: error
       })
    })
}

exports.deleteCustomer = (req, res, next) => {
  const custId = +req.params.id
  Customer.deleteOne({ id : custId})
          .then(() => {
              res.status(201).json({
                message: 'deleted succesfully'
              })
          }).catch((error) => {
            res.status(400).json({
              error: error
            })
        })
          
}