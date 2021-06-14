import {
  createRegister,
  getAllRegister,
} from "../../../server/service/RegisterService"
import withValidateToken from "../../../utils/server/withValidateToken"

const handler = async (req, res) => {
  let statusCode, body
  switch (req.method) {
    case "GET": {
      const allRegister = await getAllRegister()
      statusCode = allRegister.statusCode
      body = allRegister.body
      break
    }
    case "POST": {
      const newRegister = await createRegister(req.body)
      statusCode = newRegister.statusCode
      body = newRegister.body
      break
    }
    default: {
      statusCode = 404
      body = { message: "Not found url with method" }
      break
    }
  }
  res.status(statusCode).json({
    status: statusCode,
    ...body,
  })
}
export default withValidateToken(handler)
