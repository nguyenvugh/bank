import { login } from "../../../server/service/LoginService"

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      const { username, password } = req.body
      const rs = await login(username, password)
      res.status(rs.statusCode).json({
        status: rs.statusCode,
        ...rs.body,
      })
      break
    }
    default: {
      res.status(404).json({
        status: 404,
        message: "Not found url with method",
      })
      break
    }
  }
}
