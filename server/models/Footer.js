import mongoose from "mongoose"
const Schema = mongoose.Schema

const FooterSchema = new Schema({
  left: {
    type: String,
  },
  right: {
    type: String,
  },
})

export default mongoose.models.footers ||
  mongoose.model("footers", FooterSchema)
