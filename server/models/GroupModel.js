const mongoose = require("mongoose");
const memberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const transactionSchema = mongoose.Schema({
  paidByUserId: {
    type: String,
    required: true,
  },
  paidByUserName: {
    type: String,
    required: true,
  },
  paidByUserEmail: {
    type: String,
    required: true,
  },
  paidFor: {
    type: String,
    required: true,
  },
  paidAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const resultSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  paidAmount: {
    type: Number,
    required: true,
  },
  finalAmount: {
    type: Number,
    required: true,
  },
});
const groupSchema = mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  members: [memberSchema],
  transactions: [transactionSchema],
  results: [resultSchema],
  status: { type: String, required: true },
});

module.exports = mongoose.model("Group", groupSchema);
