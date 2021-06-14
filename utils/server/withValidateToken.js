import { get } from "lodash"
import { verifyToken } from "../jwt.utils"

const withValidateToken = (handler) => (req, res) => {
  if (["POST", "DELETE", "PUT", "PATH"].includes(get(req, "method", null))) {
    const token = get(req, "headers.token", null)
    if (!token) {
      res.status(400).json({ status: 400, message: "Missing token" })
      return
    }

    const verifiedToken = verifyToken(token)

    if (verifiedToken) {
      req.userId = verifiedToken.userId
    } else {
      res.status(400).json({ status: 404, message: "Token is invalid" })
      return
    }
  }

  return handler(req, res)
}

export default withValidateToken
