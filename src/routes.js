const { addBooks, allBooks, getBookById, bookIdWithFinishedReading, updateBook, deleteBook } = require('./handler.js');

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
  },

  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  }
];


module.exports = routes;