<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const theme = {
  token: {
    colorPrimary: '#e15536',
  },
}
</script>

<template>
  <!-- 主题和中文包配置 -->
  <a-config-provider :theme="theme" :locale="zhCN">
    <div>vue3</div>
    <a-button type="primary">vue3</a-button>
    <StepBackwardOutlined />
  </a-config-provider>
</template>
<style scoped></style>
