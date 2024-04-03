<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row>
          <a-col :span="6">
            <a-form-item label="角色名">
              <a-input
                placeholder="请输入角色名"
                v-model:value="queryParam.roleName"
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
      <a-button @click="handleAdd('add')" type="primary">新增角色</a-button>
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
          <template v-if="column.key === 'voiceprint'">
            <span>{{ record.voiceprint }}</span>
          </template>
          <template v-if="column.key === 'corpus'">
            <span>{{ record.corpus }}</span>
          </template>
          <template v-if="column.key === 'description'">
            <a-tooltip>
              <template #title>{{ record.description }}</template>
              {{
                record.description
                  ? `${record.description.substring(0, 15)}${
                      record.description.length > 15 ? '...' : ''
                    }`
                  : ''
              }}
            </a-tooltip>
          </template>
          <template v-if="column.key === 'action'">
            <span>
              <EditOutlined
                @click="handleAdd('edit', record)"
                :style="{ fontSize: '18px', color: '#E15536' }"
              />
              <a-divider type="vertical" :style="{ margin: '0 20px' }" />
              <DeleteOutlined
                @click="deleteTableItem(deleteRole, getRoleData, { id: record.id })"
                :style="{ fontSize: '18px', color: '#E15536' }"
              />
              <a-divider type="vertical" :style="{ margin: '0 20px' }" />
              <DeliveredProcedureOutlined
                @click="handleAdd('detail', record)"
                :style="{ fontSize: '18px', color: '#E15536' }"
              />
            </span>
          </template>
        </template>
      </a-table>
    </div>
    <roleEdit @ok="searchQuery" ref="editRef" />
  </a-card>
</template>
<script setup name="roleManage">
import { getRoleData, deleteRole } from '../../api'
import { ref, h, onMounted } from 'vue'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
// import { message } from 'ant-design-vue'
import useSearch from '@/hook/useSearch'
import roleEdit from './components/roleEdit.vue'

const { queryParam, dataSource, loading, state, loadData, deleteTableItem } = useSearch()
const columns = ref([
  {
    title: '角色名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    minWidth: 300,
  },
  {
    title: '角色编码',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
    minWidth: 300,
  },
  {
    title: '角色设定/描述',
    dataIndex: 'description',
    key: 'description',
    align: 'center',
    minWidth: 300,
  },
  {
    title: '声纹',
    dataIndex: 'voiceprint',
    key: 'voiceprint',
    align: 'center',
    minWidth: 150,
  },
  {
    title: '向量库',
    dataIndex: 'corpus',
    key: 'corpus',
    align: 'center',
    minWidth: 150,
  },
  // {
  //   title: '语音克隆',
  //   dataIndex: 'voice_clone',
  //   key: 'voice_clone',
  //   align: 'center',
  //   width: 150,
  // },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: 170,
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
    pageSize: pagination.pageSize,
    page: pagination.current,
  })
}
const handleAdd = (type = 'add', record) => {
  editRef.value?.openModal(type, record)
}

onMounted(() => {
  searchQuery()
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
