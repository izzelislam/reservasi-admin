import axios from "axios"
import { baseUrl } from "../constant/values"

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})


// set base url

//  with credentials

// set token if exist in cookies
// if (token) {
//   api.defaults.headers.common["Authorization"] = `Bearer ${token}`
// }

// set loading to true before request
api.interceptors.request.use((config) => {
  return config
})

// handle request and return success or error 
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error.response)
  }
)


export default api