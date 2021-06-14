import { makeResBody } from "../../utils/utils"
import connectDb from "../mongo/database"
import Register from "../models/Register"

export async function createRegister(payload) {
  const { fullname, phone, loanType, content } = payload
  await connectDb()

  const newRegister = new Register({
    fullname,
    phone,
    loanType,
    content,
  })
  await newRegister.save()
  return makeResBody(201, { newRegister })
}

export async function getAllRegister() {
  await connectDb()
  const registers = await Register.find({})

  return makeResBody(200, { registers })
}
