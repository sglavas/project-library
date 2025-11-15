/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const { createAndSaveBook } = require('../database/models');

module.exports = function (app) {

const { createAndSaveBook } = require('./../database/mongoDB');

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title

      if(!title){
        res.send('missing required field title');
        return;
      }

      // Save book to the database
      let result = await createAndSaveBook(title);

      res.json({ _id: result._id , title: result.title });

    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
