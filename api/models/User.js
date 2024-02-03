const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  passowrd: String,
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;