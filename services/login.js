import axiosClient from "../utils/axiosClient"
import { api_login } from "../constans/api.constan"

export function login(username = "", password = "") {
  return axiosClient.post(api_login, {
    username,
    password,
  })
}
