import mongoose from "mongoose";

const Quote = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  observation: {
    type: String,
  },
  status: {
    type: String,
    required: false,
  },
  approved: {
    type: Boolean,
    required: false,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Quote', Quote);
