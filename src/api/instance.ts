import axios from 'axios'
import useAccountStorage from '@/composables/useAccountStorage'
import { useAxios } from '@vueuse/integrations/useAxios'
const { getToken } = useAccountStorage()

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

instance.interceptors.response.use(
  (resp) => {
    if (resp.data) {
      return resp.data
    }
    return resp
  },
  (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const token = getToken()
      if (token) {
        return new Promise((resolve) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`
          resolve(axios(originalRequest))
        })
      }
    }
    return Promise.reject(error)
  }
)

// GET
export const useGet = ({ url = '', data = {}, headers = {}, requiredToken = false } = {}) => {
  let fullHeaders: any = { ...headers }
  //   If having token => add Authorization with token
  requiredToken && (fullHeaders['Authorization'] = getToken())
  url
  const usedAxios = useAxios(url, { data, headers: fullHeaders, method: 'GET' }, instance, {
    // Nếu immediate là false -> chạy execute() không cần truyền url vào
    //   Vì nó sẽ thực thi url trong hàm này
    //   để chạy execute thay thế thì truyền url vào execute(url)
    immediate: false,
  })
  return usedAxios
}
// POST
export const usePost = ({ url = '', data = {}, headers = {}, requiredToken = false } = {}) => {
  let fullHeaders: any = { ...headers }
  //   If having token => add Authorization with token
  requiredToken && (fullHeaders['Authorization'] = getToken())
  url
  const usedAxios = useAxios(url, { data, headers: fullHeaders, method: 'POST' }, instance, {
    // Nếu immediate là false -> chạy execute() không cần truyền url vào
    //   Vì nó sẽ thực thi url trong hàm này
    //   để chạy execute thay thế thì truyền url vào execute(url)
    immediate: false,
  })
  return usedAxios
}
// PUT
export const usePut = ({ url = '', data = {}, headers = {}, requiredToken = false } = {}) => {
  let fullHeaders: any = { ...headers }
  //   If having token => add Authorization with token
  requiredToken && (fullHeaders['Authorization'] = getToken())
  url
  const usedAxios = useAxios(url, { data, headers: fullHeaders, method: 'PUT' }, instance, {
    // Nếu immediate là false -> chạy execute() không cần truyền url vào
    //   Vì nó sẽ thực thi url trong hàm này
    //   để chạy execute thay thế thì truyền url vào execute(url)
    immediate: false,
  })
  return usedAxios
}
// DELETE
export const useDelete = ({ url = '', data = {}, headers = {}, requiredToken = false } = {}) => {
  let fullHeaders: any = { ...headers }
  //   If having token => add Authorization with token
  requiredToken && (fullHeaders['Authorization'] = getToken())
  url
  const usedAxios = useAxios(url, { data, headers: fullHeaders, method: 'DELETE' }, instance, {
    // Nếu immediate là false -> chạy execute() không cần truyền url vào
    //   Vì nó sẽ thực thi url trong hàm này
    //   để chạy execute thay thế thì truyền url vào execute(url)
    immediate: false,
  })
  return usedAxios
}
