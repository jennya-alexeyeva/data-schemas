import * as bookDao from "../daos/book-dao.js";

const getAllBooks = async (req, res) => {
  const response = await bookDao.getAllBooks();
  res.json(response);
}

const favoriteBook = async (req, res) => {
  let book = req.body.pattern;
  let user = req.body.user;

  book = await bookDao.favoriteBook(book, user);
  res.json(book);
}

const unfavoriteBook = async (req, res) => {
  let book = req.body.pattern;
  let user = req.body.user;

  book = await bookDao.unfavoriteBook(book, user._id);
  res.json(book);
}

const findBookByGoogleBooksId = async (req, res) => {
  const googleBooksId = req.params.googleBooksId;
  const book = await bookDao.findBookById(googleBooksId);
  res.json(book);
}

export default (app) => {
  app.post('/api/books/unfavorite', unfavoriteBook);
  app.get('/api/books', getAllBooks);
  app.post('/api/books/favorites', favoriteBook);
  app.get('/api/books/:googleBooksId', findBookByGoogleBooksId);
}
