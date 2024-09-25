import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
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
  profilePicture: {
    type: String,
    default: 'https://assets.codepen.io/t-1/user-default-avatar.jpg?format=auto&version=0&width=80&height=80'
  },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User;