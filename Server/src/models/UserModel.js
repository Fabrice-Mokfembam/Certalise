import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['clerk', 'archivist', 'admin'], 
    default: 'clerk', 
  },
}, {
  timestamps: true
});


export const User = mongoose.model('User', userSchema);