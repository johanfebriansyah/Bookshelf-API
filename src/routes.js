const { addBooks, allBooks, getBookById, bookIdWithFinishedReading, updateBook } = require('./handler.js');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooks,
  },

  {
    method: 'GET',
    path: '/books',
    handler: allBooks,
  },

  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById,
  },

  {
    method: 'GET',
    path: '/books/{bookId}/finished',
    handler: bookIdWithFinishedReading,
  },

  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  }
];


module.exports = routes;