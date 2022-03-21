import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'

const service = axios.create({
  // baseURL: process.env.VUE_APP_API_URL, // url = base url + request url
  baseURL: 'http://localhost:3000/admin/api',  
  timeout: 5000 // request timeout
})


service.interceptors.request.use(
  config => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    if (err.response.data.message) {
        // console.log(err.response.data.message)
        if (err.response.status === 422) {
            ElMessage({
                type: 'error',
                message: err.response.data.message
            })
        }
        if (err.response.status == 401) {
            // 则没有权限查看 直接跳到登录页 提示登陆
            router.push('/login')
        }
    }
    return Promise.reject(err)
  }
)

export default service