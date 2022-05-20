const { findAuthorById } = require("./books");


const getTotalBooksCount = (books) => books.length;         //should return a number representing the total number of books in the library


const getTotalAccountsCount = (accounts) => accounts.length;      //should return a number representing the total number of accounts established at the library


function getBooksBorrowedCount(books) {                       //should return a number representing the number of currently borrowed books
let checkedOutBooks = books.filter((book) => book.borrows[0].returned === false);
return checkedOutBooks.length;
};


function getMostCommonGenres(books) {               //should return an array of the 5 most common genres
  const genres = books.reduce((total, book) => {                        
    const searched = total.find(key => book.genre === key.name);          
    if (searched) {                                                       
      searched.count++; 
    } else {
      total.push({ name: book.genre, count: 1 });                              
    }
    const sorted = total.sort((bookA, bookB) => bookA.count < bookB.count ? 1 : -1)
  return sorted;
  }, []);
  const [first, second, third, fourth ,fifth] = genres;
    return [first, second, third, fourth ,fifth];
  };


function getMostPopularBooks(books) {        //should return ordered list (array) of most popular books
const popBooks = books.map((book) => {
  let newCount = {name:book.title, count:book.borrows.length};
  return newCount;
});
popBooks.sort((bookA, bookB) => bookB.count - bookA.count);
return popBooks.splice(0, 5);
};

function _sortKeysByValues(object) {   //helper function to use in getMostPopularAuthors
  let keys = Object.keys(object);
  keys.sort((keyA, keyB) => 
   object[keyA] < object[keyB] ? 1 : -1);
  return keys;
};
function getMostPopularAuthors(books, authors) {
//use reduce to format the author ids with the number of borrows for each authors book
  let authorsObj = books.reduce((acc, {authorId, borrows}) => {       //destructure the book object
    if (acc[authorId]) {
      acc[authorId] += borrows.length;
      } else {
          acc[authorId] = borrows.length;
          };
    return acc;
  }, {});
  let sorted = _sortKeysByValues(authorsObj);
      return sorted.map(authorId => {
      let author = authors.find(auth => auth.id == authorId);
      let name = `${author.name.first} ${author.name.last}`;
      let retObj = {name, count:authorsObj[authorId]};
        return retObj;
      }).slice(0, 5);                                 
};


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};