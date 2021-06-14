import mongoose from "mongoose"

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vunv:tinhtechamcom@bank.9fkhg.mongodb.net/bank?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}
export default connectDb
