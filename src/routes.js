const { addBooks, allBooks, getBookById } = require('./handler.js');

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
  }
];


module.exports = routes;