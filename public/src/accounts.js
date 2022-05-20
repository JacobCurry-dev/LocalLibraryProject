const { findAuthorById } = require("./books");


const findAccountById = (accounts, id) => accounts.find((account) => account.id === id);  //should return an account object that has a matching id to the id passed in to the function


const sortAccountsByLastName = (accounts) =>  //should return an array of account objects that is sorted alphabetically a-z based off the account's last name
  accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);


function getTotalNumberOfBorrows(account, books) {  //should return a number that represents the total number of times an account has borrowed a book
  let total = 0;
    for (let i = 0; i < books.length; i++) {
      let book = books[i];
      let bookBorrows = books[i].borrows;
        total = bookBorrows.reduce((acc, book) => book.id === account.id ? total += 1 : total +=0, 0);
  }
  return total;
}



function getBooksPossessedByAccount(account, books, authors) {    //returns an array of book objects, including author information, that reps all books currently checked out by the account
  let filteredBooks = [];
  filteredBooks = books.filter((book) => {
  let borrowedBooks = book.borrows;
  return borrowedBooks.some((borrow) => borrow.returned == false && borrow.id == account.id)
});
  filteredBooks = filteredBooks.map((book) => {
    let author = findAuthorById(authors, book.authorId);      //used findAuthorById from the books.js file AS A HELPER FUNCTION!!
  let result = {...book, author};
  return result;
  });
  return filteredBooks;
  };




module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
