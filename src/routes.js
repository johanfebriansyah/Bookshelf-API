const { addBooks } = require('./handler.js');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooks,
  }
];


module.exports = routes;