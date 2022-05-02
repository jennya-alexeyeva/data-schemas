import bookModel from "../models/book-model.js";

export const getAllBooks = () => bookModel.find();

export const favoriteBook = async (book, user) => {
  let existingBook = await bookModel.findOne({googleBooksId: book.googleBooksId});

  if (existingBook) {
    await bookModel.updateOne({googleBooksId: book.googleBooksId}, {
      $set: {favoritedUsers: [...existingBook.favoritedUsers, user], favorited: true}});
    existingBook.favoritedUsers = [...existingBook.favoritedUsers, user];
  } else {
    existingBook = await bookModel.create({
      title: book.title,
      image: book.image,
      description: book.description,
      author: book.author,
      favoritedUsers: [user],
      link: book.link,
      googleBooksId: book.googleBooksId,
    })
  }

  return existingBook;
}

export const unfavoriteBook = async (book, id) => bookModel.updateOne({googleBooksId: book.googleBooksId}, {$set: {favoritedUsers: book.favoritedUsers.filter(user => user !== id)}});

export const findBookById = async (googleBooksId) => {
  return bookModel.findOne({googleBooksId});
}
