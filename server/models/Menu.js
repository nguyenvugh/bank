import mongoose from "mongoose"
const Schema = mongoose.Schema

const MenuSchema = new Schema({
  title: {
    type: String,
  },
  parentId: {
    type: String,
  },
  path: {
    type: String,
  },
  postId: {
    type: String,
  },
})

export default mongoose.models.menus || mongoose.model("menus", MenuSchema)
