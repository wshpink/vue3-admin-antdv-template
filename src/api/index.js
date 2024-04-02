import axios from './api' // 倒入 api

export const getRoleData = (params) => {
  return axios({
    url: '/role/getPages',
    method: 'GET',
    params,
  })
}

export const addRole = (params) => {
  return axios({
    url: '/role/add',
    method: 'GET',
    params,
  })
}

export const deleteRole = (params) => {
  return axios({
    url: '/role/delById',
    method: 'GET',
    params,
  })
}
