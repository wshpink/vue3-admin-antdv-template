<template>
  <a-modal :title="dialogType == 'add' ? '新增角色' : dialogType == 'deit' ? '编辑角色' : '角色详情'" :maskClosable="false" v-model:open="isVisible" @ok="handleOk" @cancel="handleCancel" :footer="dialogType == 'detail' ? null : ''">
    <a-form :model="formState" layout="vertical" ref="formRef" :rules="rules">
      <a-form-item label="角色名称" name="name" v-if="dialogType != 'detail'">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="角色代码" name="code" v-if="dialogType != 'detail'">
        <a-input v-model:value="formState.code" />
      </a-form-item>
      <a-row :gutter="12" v-if="dialogType == 'detail'">
        <a-col :span="12">
          <a-form-item label="角色名称" name="name">
            <a-input v-model:value="formState.name" disabled/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="角色代码" name="code">
            <a-input v-model:value="formState.code" disabled/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item label="角色设定描述" name="description">
        <a-textarea
          v-model:value="formState.description"
          :autoSize="{ minRows: 2, maxRows: 5 }"
          :disabled="dialogType == 'detail'"
        />
      </a-form-item>
      <a-form-item label="头像" name="profilePicture" v-if="dialogType == 'edit'">
        <!-- <img
          v-if="dialogType == ''"
          :src="formState.profilePicture"
          alt="avatar"
          style="width: 100px; height: 100px"
        /> -->
        <a-upload
          list-type="picture-card"
          :max-count="1"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          :customRequest="handleChange"
          accept="image/png, image/jpeg"
          @mouseenter="handleMouseEnter" 
          @mouseleave="handleMouseLeave"
          v-if="dialogType == 'edit'"
        >
          <img class="img" v-if="formState.profilePicture" :src="formState.profilePicture" alt="头像" />
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">上传头像</div>
          </div>
          <close-outlined
            v-if="showDeleteIcon && formState.profilePicture"
            class="delete-icon"
            type="close-circle"
            @click.stop="deleteImage()"
          ></close-outlined>
        </a-upload>
      </a-form-item>
      <a-form-item label="头像" name="profilePicture" v-if="dialogType == 'detail' && formState.profilePicture">
        <img class="img" v-if="formState.profilePicture" :src="formState.profilePicture" alt="头像"  @click="preview" style="cursor: pointer;" />
      </a-form-item>
      <a-row :gutter="12" v-if="dialogType == 'detail'">
        <a-col :span="12">
          <a-form-item label="声纹" name="voiceprint">
            <div class="changeItem">
              <div class="showParam">{{ formState.voiceprint == 1 ? '已构建' : '未构建' }}</div>
              <a-button type="primary" @click="openVoiceprint">构建</a-button>
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="向量库" name="corpus">
            <div class="changeItem">
              <div class="showParam">{{ formState.corpus == 1 ? '已构建' : '未构建' }}</div>
              <a-button type="primary" @click="addCorpus">构建</a-button>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
  <a-modal :open="previewVisible" title="图片预览" :footer="null" @cancel="closeImg" width="1000px">
    <img alt="example" style="width: 100%" :src="formState.profilePicture" />
  </a-modal>
  <!-- <voiceUpload @ok="updateVoice" ref="voiceUpload" /> -->
</template>
<script setup name="roleEdit">
import { reactive, ref, nextTick, defineExpose } from 'vue'
import { message } from 'ant-design-vue'
import { addRole, uploadFile, updateRole, buildCurpus } from '@/api'
// import voiceUpload from './voiceUpload.vue'


const emit = defineEmits(['ok'])

const loading = ref(false)
const showDeleteIcon = ref(false)
const baseUrl = import.meta.env.VITE_APP_BASE_URL
// 定义表单状态
const formState = reactive({
  name: '',
  code: '',
  description: '',
  profilePicture: '',
})
const roleCode = ref('')
// const detailObj = reactive({
//   voiceprint: '',
//   corpus: ''
// })

const rules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入角色代码', trigger: 'blur' }],
  description: [{ required: true, message: '请输入角色设定描述', trigger: 'blur' }],
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
//       formState.code = ''
//       return Promise.reject('只能输入英文字母')
//     } else {
//       return Promise.resolve()
//     }
//   } else {
//     return Promise.reject('请输入角色代码')
//   }
// }


const handleChange = async (info) => {
  loading.value = true
  // const fileName = options.file.name
  // const FormDatas = new FormData();
  // FormDatas.append('file', options.file, fileName);
  const data = await uploadFile(info.file, formState.id)
  loading.value=false
  formState.profilePicture = data.data.path
}

//鼠标悬停事件
const handleMouseEnter=()=> {
  showDeleteIcon.value = true;
}
 
//鼠标离开事件
const handleMouseLeave=()=> {
  showDeleteIcon.value = false;
}
//删除当前图片
const deleteImage = () => {
  formState.profilePicture = ''; // 清除图片数据
  showDeleteIcon.value = false; // 隐藏删除图标
}

const beforeUpload = (file) => {
  console.log(file)
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
  isVisible.value = true
  dialogType.value = type
  if (type != 'add') {
    formState.id = record.id
    formState.name = record.name || ''
    formState.code = record.code || ''
    formState.description = record.description || ''
    formState.profilePicture = record.profilePicture || ''
    formState.corpus = record.corpus || ''
    formState.voiceprint = record.voiceprint || ''
    roleCode.value = formState.code
  }
  if(type == 'detail') {
    detailObj.voiceprint = record.voiceprint || ''
    detailObj.corpus = record.corpus || ''
  }
}

// 处理确认事件
const handleOk = () => {
  // 在这里添加保存逻辑
  let API = dialogType == 'add' ? addRole : updateRole
  nextTick(() => {
    formRef.value.validateFields().then(() => {
      API(formState).then(res => {
        if(res.status == 200) {
          message.success('提交成功')
          handleCancel()
          emit("ok")
        }
      })
      
    })
  })
}

// 处理取消事件
const handleCancel = () => {
  formState.name = ''
  formState.code = ''
  formState.description = ''
  formState.profilePicture = ''
  formRef.value.clearValidate()
  isVisible.value = false
  // if(detailObj.voiceprint != formState.voiceprint || detailObj.corpus != formState.corpus) {
  //   emit("ok")
  // }
}

const addCorpus = () => {
  buildCurpus({roleCode: roleCode.value}).then(res => {
    if(res.status == 200) {
      message.success('构建成功')
    } else {
      message.warning(res.msg)
    }
  }).catch(err => {
    message.warning(err?.msg || '构建失败')
  })
}
const openVoiceprint = () => {

}

const updateVoice = 

defineExpose({
  openModal,
  handleCancel,
})
</script>
<style lang="scss" scoped>
.changeItem {
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 6px;
  .showParam {
    flex: 1;
    height: 100%;
    align-self: center;
    margin-right: 10px;
    padding-left: 5px;
  box-sizing: border-box;
  }
}
</style>
