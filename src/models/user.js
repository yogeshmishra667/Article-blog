const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
});
//hash the plain text before the save
userSchema.pre('save', async function (next) {
  const user = this; //you can access Name, Email, Password, etc.
  if (user.isModified('password')) {
    //isModified data modified or not
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
  /*next function call when function completed next function is must because if
   you can used next() function never call because it understand data in process */
});

const User = mongoose.model('User', userSchema);

module.exports = User;
