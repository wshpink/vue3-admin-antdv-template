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

export const updateRole = (params) => {
  return axios({
    url: '/role/updateRole',
    method: 'GET',
    params,
  })
}

export const deleteRole = ({id}) => {
  return axios({
    url: `/role/delById/${id}`,
    method: 'GET',
  })
}

//图片上传
export const uploadFile = (file, id) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios({
    url: `/role/uploadPic?id=${id}`,
    method: 'POST',
    data: formData,
    headers: {
      'Content-type': 'multipart/form-data',
    },
  })
}

//构建语料
export const buildCurpus = (params) => {
  return axios({
    url: '/role/curpusBuild',
    method: 'GET',
    params
  })
}