const baseUrl = import.meta.env.VITE_APP_BASE_URL
export default {
  // 基础url前缀
  baseURL: baseUrl,
  // 请求头信息
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
}
