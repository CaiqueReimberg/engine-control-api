import mongoose from "mongoose";

const Client = new mongoose.Schema({
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
  cpf: {
    type: String,
    required: true,
    lowercase: true,
    length: 14,
  },
  birthDate: {
    type: String,
    required: true,
  },
  observation: {
    type: String,
  },
  tel: {
    type: String,
    require: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Client', Client);
