import { get } from "lodash"
import {
  createGroup,
  getAllGroup,
  deleteGroupById,
  editGroupById,
} from "../../../server/service/GroupService"
import withValidateToken from "../../../utils/server/withValidateToken"

const handler = async (req, res) => {
  let statusCode, body
  const { groupId } = get(req, "query", {})
  switch (req.method) {
    case "GET": {
      const allGroup = await getAllGroup()
      statusCode = allGroup.statusCode
      body = allGroup.body
      break
    }
    case "POST": {
      const newGroup = await createGroup(req.body)
      statusCode = newGroup.statusCode
      body = newGroup.body
      break
    }
    case "DELETE": {
      const deletedGroup = await deleteGroupById(groupId)
      statusCode = deletedGroup.statusCode
      body = deletedGroup.body
      break
    }
    case "PUT": {
      const updateddGroup = await editGroupById(groupId, req.body)
      statusCode = updateddGroup.statusCode
      body = updateddGroup.body
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
