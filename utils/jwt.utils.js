import jwt from "jsonwebtoken"

export function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET_KEY)
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
  } catch (error) {
    console.log(error)
    return false
  }
}

export function getToken() {
  return localStorage.getItem("token")
}
