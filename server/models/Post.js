import mongoose from "mongoose"
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  group: {
    type: String,
  },
  imgSrc: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.posts || mongoose.model("posts", PostSchema)
