
var finished_anime = require('./model/finished_anime');
var author = require('./model/author');
// create a new finished_anime called a
var sample = new finished_anime({
  aid: '231234',  //anime id
  title: 'sample2', 
  play: 5,  
  favorites: 6,
  danmaku: 7,  //danmu
  create: '2017-07-08 06:39', //date posted
  mid: 5678    //author id
});


sample.dudify(function(err, title) {
    if (err) throw err;
});

//   if (err) throw err;
// });

var sample_author = new author({
  mid: 1234,  //author id
  name: "asdf",  //name
  regtime: 12345,
  article: 2, 
  fans: 3,  //
  playNum: 5
});

// sample_author.save(function(err) {
//   if (err) {
//     console.log("fail to save finished_anime");
//   }
//   else console.log('sample saved successfully!');
// });

finished_anime.find({ title: 'sample2' }, function(err, anime) {
  if (err) {
    console.log("fail to find finished_anime with title sample2");
  }
  else console.log('sample found successfully!' + anime);
});




