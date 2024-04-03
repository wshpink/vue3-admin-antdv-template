//注册全局图标组件
import {
  StepBackwardOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  LoadingOutlined,
  CloseOutlined,
  DeliveredProcedureOutlined
} from '@ant-design/icons-vue'
const icons = [StepBackwardOutlined, SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined, LoadingOutlined, CloseOutlined,DeliveredProcedureOutlined]

export default {
  install(app) {
    icons.forEach((icon) => {
      app.component(icon.displayName, icon)
    })
  },
}
