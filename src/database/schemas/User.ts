import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  token: {
    type: String,
    require: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

User.pre('save', async function(next) {
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;

  const token = jwt.sign(
    { mail: this.email },
    'PUCTCCPOSRANDOMD76B9F4A29A17F1D127C93502BB978918B18C32961982FC9C3DEB62FF6C70DB7',
  )

  this.token = token;

  next();
});

export default mongoose.model('User', User);
