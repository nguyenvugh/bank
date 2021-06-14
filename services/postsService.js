import axiosClient from "../utils/axiosClient"
import { api_posts } from "../constans/api.constan"
import querystring from "query-string"

export function getAllPosts() {
  return axiosClient.get(api_posts)
}
export function createNewPost(payload) {
  return axiosClient.post(api_posts, payload)
}
export function deletePosts(params) {
  return axiosClient.delete(api_posts + "?" + querystring.stringify(params))
}
export function editPostsById({ postId, ...body }) {
  return axiosClient.put(
    api_posts + "?" + querystring.stringify({ postId }),
    body
  )
}
