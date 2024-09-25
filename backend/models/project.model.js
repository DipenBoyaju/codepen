import mongoose from 'mongoose'
import User from './user.model.js'

const projectSchema = await mongoose.Schema({
  title: {
    type: String,
  },
  htmlCode: {
    type: String,
  },
  cssCode: {
    type: String,
  },
  jsCode: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  image: {
    type: String,
    default: ''
  },
  penDetails: {
    type: String,
  },
  penTags: {
    type: String,
  },
  penVisibility: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true })

const Project = mongoose.model('Project', projectSchema);

export default Project;