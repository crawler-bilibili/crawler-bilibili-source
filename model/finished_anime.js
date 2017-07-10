var mongoose = require('mongoose');
mongoose.connect('mongodb://crawler-bilibili:m3745055@ds143892.mlab.com:43892/crawler-bilibili', {
  useMongoClient: true,
});
var Schema = mongoose.Schema;

// create a schema
var anime_schema = new Schema({
  aid: { type: String, required: true, unique: true },  //anime id 
  pic: String, //picture
  title: { type: String, required: true}, 
  duration: Number,
  play: { type: Number, required: true},  
  favorites: { type: Number, required: true },
  danmaku: { type: Number, required: true },  //danmu
  create: { type: String, required: true }, //date posted
  mid: { type: String, required: true}    //author id
});


anime_schema.methods.dudify = function() {
  // add some stuff to the users name
  this.title = this.title + '-dude';

  return this.title;
};

// the schema is useless so far
// we need to create a model using it
var finished_anime = mongoose.model('finished_anime', anime_schema);

// make this available to our users in our Node applications
module.exports = finished_anime;





