const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      State = require('./states');

//console.log(State);
const OrderSchema = new Schema({
  productName  : { type : String },
  itemCost    : { type : Number },
  });

const CustomerSchema = new Schema({
  firstName   : { type : String, required: true, trim: true },
  lastName    : { type : String, required: true, trim: true },
  address     : { type : String, required: true, trim: true },
  city        : { type : String, required: true, trim: true },
  state       : State.schema,
  orders      : [ OrderSchema ],
  latitude    : { type : Number },
  longitude   : { type : Number }
 });

module.exports = mongoose.model('Customer', CustomerSchema, 'customers');
