import mongoose from "mongoose"
const Schema = mongoose.Schema

const RegisterSchema = new Schema({
  fullname: {
    type: String,
  },
  phone: {
    type: String,
  },
  loanType: {
    type: String,
  },
  content: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.register ||
  mongoose.model("register", RegisterSchema)
