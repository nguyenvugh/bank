import { get, isArray, isObject } from "lodash"

export function updateTreeDataByField(
  childrenData = [],
  fileUpdated = "title",
  fieldPresentChilds = "children",
  newData = ""
) {
  return childrenData.map((child) => {
    const children = get(child, fieldPresentChilds, [])
    const newChild = {
      ...child,
      [fileUpdated]: newData,
    }
    if (children) {
      newChild[fieldPresentChilds] = updateTreeDataByField(children)
    }

    return newChild
  })
}

const replaceObjectById = (data, newObject) => {
  if (isArray(data)) {
    return data.map((item) => replaceObjectById(item, newObject))
  }
  if (isObject(data) && data._id === newObject._id) {
    return newObject
  }

  if (isObject(data) && data._id !== newObject._id) {
    return Object.keys(data).reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: replaceObjectById(data[curr], newObject),
      }),
      {}
    )
  }
  return data
}

export default replaceObjectById
