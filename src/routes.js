const { addBooks, allBooks, getBookById, bookIdWithFinishedReading } = require('./handler.js');

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
  }
];


module.exports = routes;