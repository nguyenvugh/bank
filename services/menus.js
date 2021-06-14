import axiosClient from "../utils/axiosClient"
import { api_get_all_menus } from "../constans/api.constan"
import querystring from "query-string"

export function createNewMenus(payload = {}) {
  return axiosClient.post(api_get_all_menus, payload)
}
export function deleteMenusById(params) {
  return axiosClient.delete(
    api_get_all_menus + "?" + querystring.stringify(params)
  )
}
export function updateMenusById({ menuId, ...body }) {
  return axiosClient.put(
    api_get_all_menus + "?" + querystring.stringify({ menuId }),
    body
  )
}
