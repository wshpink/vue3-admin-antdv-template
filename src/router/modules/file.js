export default {
  name: 'fileManage',
  component: () => import('@/views/fileManage/index.vue'),
  path: '/fileManage',
  // redirect: '/xxx/xxxx',
  meta: { title: '文件管理', icon: '', order: 1 },
  children: [],
}
