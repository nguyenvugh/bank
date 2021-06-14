import { makeResBody } from "../../utils/utils"
import connectDb from "../mongo/database"
import Menu from "../models/Menu"
import { get } from "lodash"

String.prototype.toObjectId = function () {
  var ObjectId = require("mongoose").Types.ObjectId
  return new ObjectId(this.toString())
}
export async function createMenu(payload) {
  const { _id, title, parentId, path, post } = payload
  if (!title) {
    return makeResBody(400, { error: "title is required" })
  }

  await connectDb()

  const newMenu = new Menu({
    _id,
    title,
    parentId,
    path,
    post,
  })
  await newMenu.save()
  return makeResBody(201, { newMenu })
}

export async function getAllMenu() {
  await connectDb()
  const menus = await Menu.find({})

  return makeResBody(200, { menus })
}

export async function deleteMenuById(menuId) {
  if (!menuId) {
    return makeResBody(400, { error: "meuId is required" })
  }
  await connectDb()
  let result = {}

  await Menu.deleteMany(
    {
      $or: [
        { _id: menuId.toObjectId() },
        { path: { $regex: new RegExp(menuId) } },
      ],
    },
    function (err, menu) {
      if (err) {
        result = makeResBody(400, {
          err,
        })
      } else {
        result = makeResBody(200, {
          menu,
        })
      }
    }
  )

  return makeResBody(200, { menu: get(result, "body.menu", null) })
}

export async function editMenuById(menuId, body) {
  if (!menuId) {
    return makeResBody(400, { error: "menuId is required" })
  }
  await connectDb()
  let result = {}
  await Menu.findByIdAndUpdate(menuId, body, function (err, updatedMenu) {
    if (err) {
      result = makeResBody(400, {
        err,
      })
    } else {
      result = makeResBody(200, {
        updatedMenu,
      })
    }
  })
  return makeResBody(200, {
    updatedMenu: get(result, "body.updatedMenu", null),
  })
}
