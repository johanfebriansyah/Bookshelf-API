const { nanoid } = require('nanoid');
const books = require('./books.js');

const addBooks = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  };

  if (readPage > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  };

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const bookSuccessAdd = books.filter((book) => book.id == id).length > 0;

  if (bookSuccessAdd){
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan'
  });
  response.code(500);
  return response;
};


const allBooks = (request, h) => {

  const { name, reading, finished } = request.query;
  let existingBooks = books;

  if (name){
    existingBooks = existingBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  };

  if (reading) {
    const isReading = reading === '1';
    existingBooks = existingBooks.filter((book) => book.reading === isReading);
  };

  if (finished){
    const isFinished = finished === '1';
    existingBooks = existingBooks.filter((book) => book.finished === isFinished);
  }

  existingBooks = existingBooks.map((book) => {
    return {
      id: book.id,
      name: book.name,
      publisher: book.publisher
    };
  });

  const response = h.response({
    status: 'success',
    data: {
      books: existingBooks
    },
  });
  response.code(200);
  return response;
};


const getBookById = (request, h) => {
  const { bookId } = request.params;

  const book = books.find((b) => b.id === bookId);

  if (book) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const bookIdWithFinishedReading = (request, h) => {
  const { bookId } = request.params;

  const book = books.find((b) => b.id === bookId);

  if (book.finished){
    const response = h.response({
      status: 'success',
      data: {
        book,
      }
    });
    response.code(200);
    return response;
  }
};

const updateBook = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }


  const index = books.findIndex((i) => i.id === bookId);

  if (index === -1){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  };

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
};


const deleteBook = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1){
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  books.splice(index, 1);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  response.code(200);
  return response;
};


module.exports = { addBooks, allBooks, getBookById, bookIdWithFinishedReading, updateBook, deleteBook };