const Book = require('./models');

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


module.exports = { createAndSaveBook, fetchBooks }
