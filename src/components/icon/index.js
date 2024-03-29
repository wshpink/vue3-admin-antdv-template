//注册全局图标组件
import { StepBackwardOutlined } from '@ant-design/icons-vue'
const icons = [StepBackwardOutlined]

export default {
  install(app) {
    icons.forEach((icon) => {
      app.component(icon.displayName, icon)
    })
  },
}
