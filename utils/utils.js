import { get } from "lodash"

export function makeResBody(statusCode = 200, body = {}) {
  return {
    statusCode,
    body,
  }
}
export function genPath(src = {}) {
  return get(src, "path", null)
    ? [get(src, "path", null), src._id].join(".")
    : src._id
}

export function flatToTree(src = {}) {
  const parents = src.filter((i) => !i.parentId)
  const findChildren = (parents, referenceArray) =>
    parents.map(({ _id, ...rest }) => ({
      _id,
      key: _id,
      ...rest,
      children: findChildren(
        referenceArray.filter((i) => i.parentId === _id),
        src
      ),
    }))
  return findChildren(parents, src)
}
