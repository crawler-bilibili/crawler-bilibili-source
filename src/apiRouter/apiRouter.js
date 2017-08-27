'use strict';

import Express from 'express';
import anime from '../../model/finished_anime';
import author from '../../model/author';

var apiRouter = Express.Router();

apiRouter.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});


apiRouter.route('/anime')
 //retrieve all anime from the database
 .get(function(req, res) {
 //looks at our anime Schema
 anime.find(function(err, anime) {
 if (err)
 res.send(err);
 //responds with a json object of our database anime.
 res.json(anime)
 }).limit(12);
 })

apiRouter.route('/author')
 //retrieve all author from the database
 .get(function(req, res) {
 //looks at our author Schema
 author.find(function(err, author) {
 if (err)
 res.send(err);
 //responds with a json object of our database author.
 res.json(author)
 }).limit(12);
 })

 apiRouter.route('/newanime')
 //retrieve all anime from the database
 .get(function(req, res) {
 //looks at our anime Schema
 anime.find(function(err, anime) {
 if (err)
 res.send(err);
 //responds with a json object of our database anime.
 res.json(anime)
 }).limit(12).sort({create:-1});
 })


module.exports = apiRouter;