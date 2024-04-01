<template>
  <a-layout class="layout">
    <a-layout-header class="layout-header">
      <AppHeader />
    </a-layout-header>
    <a-layout-content class="layout-content">
      <router-view />
    </a-layout-content>
    <!-- <a-layout-footer class="layout-footer"> Ant Design ©2018 Created by Ant UED </a-layout-footer> -->
  </a-layout>
</template>
<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
// const selectedKeys = ref(['fileManage'])
// const items = ref([
//   {
//     key: 'fileManage',
//     label: '文件管理',
//   },
//   {
//     key: 'roleManage',
//     label: '角色管理',
//   },
// ])
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;
  &-header {
    width: 100%;
    height: 64px;
    background-color: #fff;
    padding-right: 100px;
    display: flex;
    justify-content: end;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  &-content {
    width: 100%;
    height: calc(100vh - 64px);
    background-color: #fff;
  }
}
</style>
