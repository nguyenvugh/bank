import mongoose from "mongoose"
const Schema = mongoose.Schema

const GroupSchema = new Schema({
  title: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.groups || mongoose.model("groups", GroupSchema)
