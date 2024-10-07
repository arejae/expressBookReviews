const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book lists
const getBooks = () => {
  return new Promise((resolve, reject) => {
      resolve(books);
  });
};

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Task 1
  try {
    const bookList = await getBooks(); 
    res.json(bookList); // Neatly format JSON output
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving book list" });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Task 2
  getByISBN(req.params.isbn)
  .then(
      result => res.send(result),
      error => res.status(error.status).json({message: error.message})
  );
});

const getByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
      let isbnNum = parseInt(isbn);
      if (books[isbnNum]) {
          resolve(books[isbnNum]);
      } else {
          reject({ status: 404, message: `ISBN ${isbn} not found` });
      }
  });
};
  
// Get book details based on author
// Task3
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  
  getBooks()
    .then((bookEntries) => Object.values(bookEntries)) // Get the list of books
    .then((books) => books.filter((book) => book.author === author)) // Filter books by author
    .then((filteredBooks) => {
      if (filteredBooks.length === 0) {
        return res.status(404).json({ message: 'Book not found' }); // Respond with 404 if no books are found
      }
      return res.json(filteredBooks); // Otherwise, respond with the filtered books
    })
    .catch((err) => {
      res.status(500).json({ message: 'An error occurred', error: err }); // Handle any potential errors
    });
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
