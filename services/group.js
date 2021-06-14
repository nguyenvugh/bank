import axiosClient from "../utils/axiosClient"
import { api_groups } from "../constans/api.constan"
import querystring from "query-string"

export function getAllGroups() {
  return axiosClient.get(api_groups)
}
export function createNewGroup(payload) {
  return axiosClient.post(api_groups, payload)
}
export function deleteGroupById(payload) {
  return axiosClient.delete(api_groups + "?" + querystring.stringify(payload))
}
export function editGroupById({ groupId, title }) {
  return axiosClient.put(
    api_groups + "?" + querystring.stringify({ groupId }),
    {
      title,
    }
  )
}
