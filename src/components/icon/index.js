//注册全局图标组件
import {
  StepBackwardOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
const icons = [StepBackwardOutlined, SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined]

export default {
  install(app) {
    icons.forEach((icon) => {
      app.component(icon.displayName, icon)
    })
  },
}
