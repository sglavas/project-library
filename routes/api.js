/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';


module.exports = function (app) {

const { createAndSaveBook, fetchBooks, findBook } = require('./../database/mongoDB');

  app.route('/api/books')
    .get(async function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      // Fetch books from the database
      const result = await fetchBooks();

      // Send the books as a response
      res.send(result);
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
    .get(async function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

      // Query the database with book id
      const result = await findBook(bookid);

      // If the ID was incorrect, send error
      if(result === false || result.length === 0){
        res.send("no book exists");
        return;
      }

      // Get JSON response
      const responseObject = { "_id": result[0]._id, "title": result[0].title, "comments": result[0].comments };

      res.json(responseObject);

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
