import {
  getAllFooter,
  updateFooterById,
} from "../../../server/service/FooterService"
import withValidateToken from "../../../utils/server/withValidateToken"

const handler = async (req, res) => {
  let statusCode, body
  switch (req.method) {
    case "GET": {
      const allFooter = await getAllFooter()
      statusCode = allFooter.statusCode
      body = allFooter.body
      break
    }

    case "PUT": {
      const { footerId } = req.query
      const newFooter = await updateFooterById({ footerId, ...req.body })
      statusCode = newFooter.statusCode
      body = newFooter.body
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
  res.status(statusCode).json({
    status: statusCode,
    ...body,
  })
}
export default withValidateToken(handler)
