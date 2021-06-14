import { makeResBody } from "../../utils/utils"
import connectDb from "../mongo/database"
import Footer from "../models/Footer"
import { get } from "lodash"

export async function getAllFooter() {
  await connectDb()
  const footers = await Footer.find({})

  return makeResBody(200, { footers })
}

export async function updateFooterById(payload) {
  const { footerId, left, right } = payload
  if (!footerId) {
    return makeResBody(400, { error: "footerId is required" })
  }
  await connectDb()
  let result = {}
  await Footer.findByIdAndUpdate(
    footerId,
    { left, right },
    function (err, footer) {
      if (err) {
        result = makeResBody(400, {
          err,
        })
      } else {
        result = makeResBody(200, {
          footer,
        })
      }
    }
  )

  return makeResBody(200, { footer: get(result, "body.footer", null) })
}
