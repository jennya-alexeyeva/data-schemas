import mongoose from 'mongoose';

const schema = mongoose.Schema({
  title: String,
  image: String,
  description: String,
  author: String,
  favoritedUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
  link: String,
  googleBooksId: String
}, {timestamps: true});

const bookModel = mongoose.model('BookModel', schema);

export default bookModel;