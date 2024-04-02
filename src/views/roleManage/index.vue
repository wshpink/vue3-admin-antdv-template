<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row>
          <a-col :span="6">
            <a-form-item label="角色名">
              <a-input
                placeholder="请输入角色名"
                v-model:value="queryParam.RoleInfo"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <span style="float: right; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" :icon="h(SearchOutlined)" @click="searchQuery"
                >查询</a-button
              >
              <a-button
                type="primary"
                :icon="h(ReloadOutlined)"
                @click="resetQuery"
                style="margin-left: 8px"
                >重置</a-button
              >
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div style="margin-bottom: 10px">
      <a-button @click="handleAdd('')" type="primary">新增角色</a-button>
    </div>
    <div>
      <a-table
        ref="table"
        size="middle"
        :scroll="{ x: true }"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="state.pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <span>
              <EditOutlined
                @click="handleAdd('edit', record)"
                :style="{ fontSize: '18px', color: '#E15536' }"
              />
              <a-divider type="vertical" :style="{ margin: '0 20px' }" />
              <DeleteOutlined
                @click="deleteTableItem(getRoleData, getRoleData)"
                :style="{ fontSize: '18px', color: '#E15536' }"
              />
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </a-card>
  <roleEdit ref="editRef" />
</template>
<script setup name="roleManage">
import { getRoleData } from '../../api'
import { ref, h, onMounted } from 'vue'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
// import { message } from 'ant-design-vue'
import useSearch from '@/hook/useSearch'
import roleEdit from './components/roleEdit.vue'

const { queryParam, dataSource, loading, state, loadData, deleteTableItem } = useSearch()
const columns = ref([
  {
    title: '角色名',
    dataIndex: 'roleName',
    key: 'roleName',
    align: 'center',
  },
  {
    title: '角色编码',
    dataIndex: 'roleCode',
    key: 'roleCode',
    align: 'center',
  },
  {
    title: '角色设定/描述',
    dataIndex: 'roleDescription',
    key: 'roleDescription',
    align: 'center',
  },
  {
    title: '声纹',
    dataIndex: 'roleVoiceprint',
    key: 'roleVoiceprint',
    align: 'center',
    width: 150,
  },
  {
    title: '向量库',
    dataIndex: 'roleCorpus',
    key: 'roleCorpus',
    align: 'center',
    width: 150,
  },
  {
    title: '语音克隆',
    dataIndex: 'roleVoiceclone',
    key: 'roleVoiceclone',
    align: 'center',
    width: 150,
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: 147,
  },
])

const editRef = ref(null)
const searchQuery = () => {
  loadData(getRoleData, 1)
}
const resetQuery = () => {
  queryParam.value = {}
  loadData(getRoleData, 1)
}
const handleTableChange = (pagination) => {
  state.pagination = pagination
  loadData(getRoleData, 0, {
    task_Role_PageSize: pagination.pageSize,
    task_Role_PageIndex: pagination.current,
  })
}
const handleAdd = (type = 'add', record) => {
  editRef.value?.openModal(type, record)
}
onMounted(() => {
  loadData(getRoleData, 1)
})
</script>
<style lang="scss" scoped>
.table-page-search-wrapper {
  border-radius: 5px;
  background-color: #fafafa;
  padding-top: 12px;
  padding-left: 12px;
  padding-right: 12px;
  margin-bottom: 12px;
  .ant-form-inline {
    width: 100%;
    display: inline-block;
    .ant-form-item {
      // display: flex;
      margin-bottom: 12px;
      margin-right: 50px;

      .ant-form-item-control-wrapper {
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        min-width: 106px;
      }
      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 12px;
    white-space: nowrap;
    // padding-left: 106px;
  }
}
</style>
