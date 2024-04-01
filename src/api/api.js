import axios from 'axios'
import config from './config.js' // 导入默认配置
import { useRouter } from 'vue-router'

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const router = useRouter()
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers,
    })
    // request 拦截器
    instance.interceptors.request.use(
      (config) => {
        // const adminToken = Vue.ls.get('token')
        // if (adminToken) {
        //   config.headers['Authorization'] = adminToken
        // }
        return config
      },
      (err) => {
        // Message.error({ message: '请求超时!' });
        return Promise.resolve(err)
      },
    )

    // response 拦截器
    instance.interceptors.response.use(
      (response) => {
        console.log(12)
        let data
        if (response.data == undefined) {
          data = response.request.responseText
        } else {
          data = response.data
        }
        console.log(data)
        if (data.success || data.status == 0) {
          return data
        } else {
          let msgType = {
            warn: 'warning',
            error: 'error',
          }
          // Message({
          //   message: data.i18nMessage,
          //   type: msgType[data.msgLevel]
          // });
          return data
        }
      },
      (err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '请重新登录'
              //清楚登录信息
              // 跳转路由
              window.location.reload()
              break
            case 403:
              err.message = '您无权访问此接口'
              break

            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break

            case 408:
              err.message = '请求超时'
              break

            case 500:
              err.message = '服务器内部错误'
              break

            case 501:
              err.message = '服务未实现'
              break

            case 502:
              err.message = '网关错误'
              break

            case 503:
              err.message = '服务不可用'
              break

            case 504:
              err.message = '网关超时'
              break

            case 505:
              err.message = 'HTTP版本不受支持'
              break

            default:
          }
        }
        if (err.response?.status !== 401) {
          // Message.error({ message: err.message })
        }
        return Promise.reject(err) // 返回接口返回的错误信息
      },
    )

    // 请求处理
    instance(options)
      .then((res) => {
        resolve(res)
        return false
      })
      .catch((error) => {
        reject(error)
      })
  })
}
