import axios from "axios"
import { get } from "lodash"
import querystring from "query-string"

const axiosClient = axios.create({
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (param) => querystring.stringify(param),
})

axiosClient.interceptors.request.use(async (config) => {
  // Handle anything before request (as add token)
  return {
    ...config,
    headers: {
      ...get(config, "headers", {}),
      token: localStorage.getItem("token"),
    },
  }
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  (error) => {
    console.log(error)
    // Handle error (as push on notfound page)
    return error.response.data
  }
)

export default axiosClient
