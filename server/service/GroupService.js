import { makeResBody } from "../../utils/utils"
import connectDb from "../mongo/database"
import Group from "../models/Group"
import { get } from "lodash"

export async function createGroup(payload) {
  const { title } = payload
  if (!title) {
    return makeResBody(400, { error: "title is required" })
  }

  await connectDb()

  const newGroup = new Group({
    title,
  })
  await newGroup.save()
  return makeResBody(201, { newGroup })
}

export async function getAllGroup() {
  await connectDb()
  const groups = await Group.find({})

  return makeResBody(200, { groups })
}

export async function deleteGroupById(groupId) {
  if (!groupId) {
    return makeResBody(400, { error: "groupId is required" })
  }
  await connectDb()
  let result = {}
  await Group.findByIdAndDelete(groupId, function (err, group) {
    if (err) {
      result = makeResBody(400, {
        err,
      })
    } else {
      result = makeResBody(200, {
        group,
      })
    }
  })

  return makeResBody(200, { group: get(result, "body.group", null) })
}

export async function editGroupById(groupId, body) {
  if (!groupId) {
    return makeResBody(400, { error: "groupId is required" })
  }
  await connectDb()
  let result = {}
  await Group.findByIdAndUpdate(groupId, body, function (err, updatedGroup) {
    if (err) {
      result = makeResBody(400, {
        err,
      })
    } else {
      result = makeResBody(200, {
        updatedGroup,
      })
    }
  })
  return makeResBody(200, {
    updatedGroup: get(result, "body.updatedGroup", null),
  })
}
