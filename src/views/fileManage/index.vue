<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row>
          <a-col :span="6">
            <a-form-item label="文件类型">
              <a-select v-model:value="queryParam.searchAudioType" style="width: 100%">
                <a-select-option
                  v-for="item in AudioTypeOptions"
                  :key="item.value"
                  :value="item.value"
                  >{{ item.label }}</a-select-option
                >
              </a-select>
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
              <EditOutlined :style="{ fontSize: '18px', color: '#E15536' }" />
              <a-divider type="vertical" :style="{ margin: '0 20px' }" />
              <DeleteOutlined :style="{ fontSize: '18px', color: '#E15536' }" />
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </a-card>
</template>
<script setup name="roleManage">
import { getRoleData } from '../../api'
import { ref, h } from 'vue'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
// import { message } from 'ant-design-vue'
import useSearch from '@/hook/useSearch'

const { queryParam, dataSource, loading, state, loadData } = useSearch()
const AudioTypeOptions = ref([
  {
    value: 'wav',
    label: 'wav',
  },
  {
    value: 'mp3',
    label: 'mp3',
  },
  {
    value: 'mp4',
    label: 'mp4',
  },
])
const columns = ref([
  {
    title: '文件名',
    dataIndex: 'fileName',
    key: 'fileName',
    align: 'center',
  },
  {
    title: '文件类型',
    dataIndex: 'fileType',
    key: 'fileType',
    align: 'center',
  },
  {
    title: '文件描述',
    dataIndex: 'fileDescribe',
    key: 'fileDescribe',
    align: 'center',
  },
  {
    title: '上传时间',
    dataIndex: 'uploadTime',
    key: 'uploadTime',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: 147,
  },
])

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
