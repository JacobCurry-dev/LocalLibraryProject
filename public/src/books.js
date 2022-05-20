const findAuthorById = (authors, id) => authors.find((author) => author.id === id); //should return an object containing author information matching the id passed in to the function


const findBookById = (books, id) => books.find((book) => book.id === id); //should return a book object with an id that matches the id passed into the function


const partitionBooksByBorrowedStatus = (books) => { //should return an array that contains 2 arrays, a 'checkedOutBooks' array and a 'returnedBooks' array
  let returnedBooks = books.filter((book) => book.borrows[0].returned);
  let checkedOutBooks = books.filter((book) => book.borrows[0].returned === false);
  return [checkedOutBooks, returnedBooks];
};


function getBorrowersForBook(book, accounts) {  //should return an array of all accounts that have borrowed a particular book
  let accountsArr = [];
  for (let borrow of book.borrows) {
    let borrowerAccount = accounts.find((account) =>borrow.id === account.id);
    borrowerAccount.returned = borrow.returned;
    accountsArr.push(borrowerAccount);
  }
  return accountsArr.splice(0, 10);
};


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
