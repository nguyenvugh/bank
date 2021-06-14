import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.users || mongoose.model("users", UserSchema)
