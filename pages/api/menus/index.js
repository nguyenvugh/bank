import { get } from "lodash"
import {
  createMenu,
  getAllMenu,
  deleteMenuById,
  editMenuById,
} from "../../../server/service/MenuService"
import withValidateToken from "../../../utils/server/withValidateToken"

const handler = async (req, res) => {
  let statusCode, body
  const { menuId } = get(req, "query", {})
  switch (req.method) {
    case "GET": {
      const allMenu = await getAllMenu()
      statusCode = allMenu.statusCode
      body = allMenu.body
      break
    }
    case "POST": {
      const newMenu = await createMenu(req.body)
      statusCode = newMenu.statusCode
      body = newMenu.body
      break
    }
    case "DELETE": {
      const deletedMenu = await deleteMenuById(menuId)
      statusCode = deletedMenu.statusCode
      body = deletedMenu.body
      break
    }
    case "PUT": {
      const updatedMenu = await editMenuById(menuId, req.body)
      statusCode = updatedMenu.statusCode
      body = updatedMenu.body
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
