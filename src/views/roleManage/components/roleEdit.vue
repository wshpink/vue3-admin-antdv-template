<template>
  <a-modal title="新增数据" v-model:open="isVisible" @ok="handleOk" @cancel="handleCancel">
    <a-form :model="formState" layout="vertical" ref="formRef" :rules="rules">
      <a-form-item label="角色名称" name="roleName">
        <a-input v-model:value="formState.roleName" />
      </a-form-item>
      <a-form-item label="角色代码" name="roleCode">
        <a-input v-model:value="formState.roleCode" @input="handleInput" />
      </a-form-item>
      <a-form-item label="角色设定描述" name="roleDescription">
        <a-textarea
          v-model:value="formState.roleDescription"
          :autoSize="{ minRows: 2, maxRows: 5 }"
        />
      </a-form-item>
      <a-form-item label="头像" name="dialogImageUrl">
        <!-- <img
          v-if="dialogType == ''"
          :src="formState.dialogImageUrl"
          alt="avatar"
          style="width: 100px; height: 100px"
        /> -->
        <a-upload
          action="http://op-srv.atm-hz.com/system/sys/common/upload"
          list-type="picture-card"
          :headers="{ 'X-Access-Token': '7f8f1cbf-9e1e-4f82-b5dc-5afb643d40d4' }"
          :max-count="1"
          :before-upload="beforeUpload"
          @change="handleChange"
          @remove="deleteImg"
          @preview="preview"
        >
          <div v-if="!formState.dialogImageUrl">
            <PlusOutlined />
            <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>
  <a-modal :open="previewVisible" title="图片预览" :footer="null" @cancel="closeImg" width="1000px">
    <img alt="example" style="width: 100%" :src="formState.dialogImageUrl" />
  </a-modal>
</template>
<script setup name="roleEdit">
import { reactive, ref, nextTick } from 'vue'
import { message } from 'ant-design-vue'

// 定义表单状态
const formState = reactive({
  roleName: '',
  roleCode: '',
  roleDescription: '',
  dialogImageUrl: '',
})

const rules = {
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  roleCode: [{ required: true, message: '请输入角色代码', trigger: 'blur' }],
  roleDescription: [{ required: true, message: '请输入角色设定描述', trigger: 'blur' }],
  dialogImageUrl: [{ required: true, message: '请上传头像', trigger: 'change' }],
}

const formRef = ref(null)

const dialogType = ref('')

const previewVisible = ref(false)

const closeImg = () => {
  previewVisible.value = false
}

const preview = () => {
  previewVisible.value = true
}

// const checkeNickName = async (rule, value) => {
//   if (value) {
//     const regex = /^[a-zA-Z]*$/
//     if (!regex.test(value)) {
//       formState.roleCode = ''
//       return Promise.reject('只能输入英文字母')
//     } else {
//       return Promise.resolve()
//     }
//   } else {
//     return Promise.reject('请输入角色代码')
//   }
// }

const handleChange = (info) => {
  if (info.file.status === 'uploading') {
    return
  }
  if (info.file.status === 'done') {
    formState.dialogImageUrl = info.file.response.message
  }
  if (info.file.status === 'error') {
    message.error('upload error')
  }
}

const deleteImg = () => {
  formState.dialogImageUrl = ''
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('只能上传jpg或者png图片')
    return false
  }
  const isLt2M = file.size / 1024 / 1024 < 5
  if (!isLt2M) {
    message.error('图片必须小于2MB!')
    return false
  }
  return isJpgOrPng && isLt2M
}

// 弹窗显示状态
const isVisible = ref(false)

// 打开新增弹窗
const openModal = (type, record = {}) => {
  console.log('open')
  isVisible.value = true
  dialogType.value = type
  if (type == 'edit') {
    formState.id = record.id
    formState.roleName = record.roleName
    formState.roleCode = record.roleCode
    formState.roleDescription = record.roleDescription
    formState.dialogImageUrl = record.dialogImageUrl
  }
}

// 处理确认事件
const handleOk = () => {
  // 在这里添加保存逻辑
  console.log('保存数据:', formState)
  nextTick(() => {
    formRef.value.validateFields().then(() => {
      console.log('tguo')
      isVisible.value = false
    })
  })
}

// 处理取消事件
const handleCancel = () => {
  formState.roleName = ''
  formState.roleCode = ''
  formState.roleDescription = ''
  formState.dialogImageUrl = ''
  formRef.value.clearValidate()
  isVisible.value = false
}
defineExpose({
  openModal,
  handleCancel,
})
</script>
<style lang="scss" scoped></style>
