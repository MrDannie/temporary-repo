const State = require('../models/states');

//Get List of States

exports.getStates = (req, res) => {
 console.log('getStates reached')
  State.find()
        .then((states) => {
           res.status(200).json({
            states: states
           })
        }).catch((error) => {
         console.log("Not able retrive states")
           res.status(400).json({
           error : error 
           })
        })
}