const Book = require('./models');
const isValidObjectId = require('./../utils/validateMongoId');
const { Query } = require('mongoose');

const createAndSaveBook = async (bookTitle) => {
    try{
        // Get comments array and length
        const commentsArray = [];
        const commentsNumber = commentsArray.length;

        // Create book document with the title from the input
        const bookEntry = new Book({
            comments: commentsArray,
            title: bookTitle,
            commentcount: commentsNumber
        })

        // Save book document to the model
        const result = await bookEntry.save();

        return result;

    }catch(err){
        console.log(err)
    }
}

const fetchBooks = async () => {
    try{
        // Query the Book model
        let result = await Book.find();
        return result;

    }catch(err){
        console.log(err);
    }
}

const findBook = async (bookId) => {
    try{
        // Validate MongoDB ID
        if(isValidObjectId(bookId)){
            // Get MongoDB filter
            let filter = {};

            filter._id = bookId;

            // Query the database
            const result = await Book.find(filter);
            return result;
        }

        return false;

    }catch(err){
        console.log(err);
    }
}

const findAndUpdateBook = async (bookId, comment) => {
    try{
        // Validate MongoDB ID
        if(isValidObjectId(bookId)){
            // Get MongoDB filter
            let filter = {};
        
            filter._id = bookId;
        
            // Find the document, append the comment, increment the commentcount and return the updated document
            const result = await Book.findOneAndUpdate(filter,
                {
                    $push: { comments: comment},
                    $inc: { commentcount: 1 }
                },
                { new: true }
            );
            return result;
        }
        
        return false;
        
    }catch(err){
        console.log(err);
    }
}


const removeBook = async (bookId) => {
    try{
        // Specify the filter using book ID
        const filter = { _id: bookId };

        // Find the document and delete it
        const result = Book.findOneAndDelete(filter);
        return result;

    }catch(err){
        console.log(err);
    }
}


module.exports = { createAndSaveBook, fetchBooks, findBook, findAndUpdateBook, removeBook }
