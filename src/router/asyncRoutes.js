const modules = import.meta.glob('./modules/*.js', { eager: true })

function formatModules(modulesList, result) {
  Object.keys(modulesList).forEach((key) => {
    const getModule = modulesList[key].default
    if (getModule) {
      result.push(getModule)
    }
  })
  return result.sort((a, b) => a.meta?.order - b.meta?.order)
}

export const asyncRoutes = formatModules(modules, [])
