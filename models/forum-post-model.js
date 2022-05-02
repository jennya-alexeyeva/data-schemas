import mongoose from 'mongoose';

const schema = mongoose.Schema({
  author: {
    username: String,
    isMaker: Boolean,
    profilePic: String
  },
  postContent: String
});

const forumPostModel = mongoose.model('ForumPostModel', schema);

export default forumPostModel;