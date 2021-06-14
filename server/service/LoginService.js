import connectDb from "../mongo/database"
import argon2 from "argon2"
import User from "../models/User"
import { generateAccessToken } from "../../utils/jwt.utils"
import { makeResBody } from "../../utils/utils"

export async function login(username, password) {
  const validation = validate(username, password)
  if (!validation.isSastify)
    return makeResBody(400, { error: validation.error })

  await connectDb()

  let result
  let findUser
  await User.findOne(
    {
      username,
    },
    function (errors, users) {
      findUser = users
      result = makeResBody(200, {
        accessToken: users ? generateAccessToken(users._id) : null,
        error: errors,
      })
    }
  )
  if (!findUser) {
    return makeResBody(400, { error: "User name or password is invalid !" })
  }

  const passwordValid = await argon2.verify(findUser.password, password)
  if (!passwordValid) {
    result = makeResBody(400, { error: "User name or password is invalid !" })
  }

  return result
}

function validate(username, password) {
  if (!username || !password) {
    return {
      isSastify: false,
      error: "Missing username or password",
    }
  }
  return { isSastify: true }
}
