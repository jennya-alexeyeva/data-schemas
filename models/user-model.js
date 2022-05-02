import mongoose from 'mongoose';

const schema = mongoose.Schema({
  username: String,
  password: String,
  aboutMe: String,
  profilePic: {
    data: Buffer,
    contentType: String
  },
  isMaker: Boolean
});

const userModel = mongoose.model('UserModel', schema);

export default userModel;