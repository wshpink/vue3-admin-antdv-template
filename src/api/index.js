import axios from './api' // 倒入 api

export const getDemo = (params) => {
  return axios({
    url: '/home/category/head',
    method: 'GET',
    params,
  })
}
