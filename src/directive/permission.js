function checkPermission(el, { value }) {
  //roleList为角色拥有的权限
  const roleList = ['edit:user']
  if (value) {
    const hasPermission = roleList.includes(value)
    if (!hasPermission) el.remove()
  } else {
    new Error(`格式错误，正确用法 v-permission="''"`)
  }
}

export default {
  mounted(el, binging) {
    checkPermission(el, binging)
  },
  update(el, binding) {
    checkPermission(el, binding)
  },
}
