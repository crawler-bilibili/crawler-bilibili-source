
var mongoose = require('mongoose');
mongoose.connect('mongodb://crawler-bilibili:m3745055@ds143892.mlab.com:43892/crawler-bilibili', {
  useMongoClient: true,
});
var Schema = mongoose.Schema;

// create a schema
var author_schema = new Schema({
  mid: { type: String, required: true, unique: true },  //author id
  name: { type: String, required: true},  //name
  face: String,
  regtime: { type: Number, required: true},
  birthday: String,  
  article: { type: Number, required: true }, 
  friend: Number,
  attention: Number,
  fans: { type: Number, required: true },  //
  playNum: { type: Number, required: true}
});

author_schema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude'; 

  return this.name;
};

// the schema is useless so far
// we need to create a model using it
var author = mongoose.model('author', author_schema);

// make this available to our users in our Node applications
module.exports = author;





