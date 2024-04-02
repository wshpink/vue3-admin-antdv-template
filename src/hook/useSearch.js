import { ref, reactive } from 'vue'
import { message, Modal } from 'ant-design-vue'
const useSearch = () => {
  const queryParam = ref({})
  const dataSource = ref([])
  const loading = ref(false)
  const state = reactive({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: ['5', '10', '20', '30', '100'],
      showTotal: (total, range) => {
        return range[0] + '-' + range[1] + ' 共' + total + '条'
      },
      showQuickJumper: true,
      showSizeChanger: true,
      total: 0,
    },
  })
  const loadData = (API, arg, paginationParam = { page: 1, pageSize: 10 }) => {
    //加载数据 若传入arg参数1则加载第一页的内容,searchParam定制化分页查询参数
    if (arg === 1) {
      state.pagination.current = 1
      state.pagination.pageSize = 10
    }
    loading.value = true
    API({
      ...queryParam.value,
      ...paginationParam,
      //   task_Role_PageSize: pagination.value.pageSize,
      //   task_Role_PageIndex: pagination.value.current,
    }).then((res) => {
      if (res?.status === 200) {
        dataSource.value = res.data.data
        state.pagination.total = res.data?.total ? res.data?.total : 0
      } else {
        message.warning(res?.data?.message || res?.data?.msg)
      }
      loading.value = false
    })
  }

  const deleteTableItem = (API, tableApi, param) => {
    Modal.confirm({
      content: '确定要删除吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        API(param).then((res) => {
          if (res.status == 200) {
            message.success('删除成功')
            loadData(tableApi, 1, tableApi)
          } else {
            message.error('删除失败')
          }
        })
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return { queryParam, dataSource, loading, state, loadData, deleteTableItem }
}

export default useSearch
