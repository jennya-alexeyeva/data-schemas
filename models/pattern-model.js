import mongoose from 'mongoose';

const schema = mongoose.Schema({
  title: String,
  image: {
    data: Buffer,
    contentType: String
  },
  price: Number,
  description: String,
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'PatternMakerModel'},
  favoritedUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'GenericUserModel'}]
}, {timestamps: true});

const patternModel = mongoose.model('PatternModel', schema);

export default patternModel;