<template>
  <template>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
          <a-row :gutter="24">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="">
                <a-input placeholder="请输入企业ID" v-model="queryParam.id" />
              </a-form-item>
            </a-col>

            <a-col :xl="24" :lg="7" :md="8" :sm="24">
              <span style="float: right; overflow: hidden" class="table-page-search-submitButtons">
                <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                <a-button type="primary" icon="reload" style="margin-left: 8px">重置</a-button>
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
          :pagination="ipagination"
          :loading="loading"
          class="j-table-force-wrap"
          @change="handleTableChange"
        >
          <template v-slot:isShowForWebSlot="text">
            <span>
              <span :style="{ color: text ? '' : 'red' }">{{ text ? '是' : '否' }}</span>
            </span>
          </template>
          <template v-slot:action="text, record, index">
            <span>
              <a>查看详情</a>
              <a-divider type="vertical" />
              <a>删除</a>
            </span>
          </template>
        </a-table>
      </div>
    </a-card>
  </template>
</template>
<script setup>
import { getDemo } from '../../api'
import { ref } from 'vue'
const queryParam = ref({})
const dataSource = ref([])
const columns = ref([
  {
    title: '企业ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '公司名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '公司地址',
    dataIndex: 'address',
    align: 'center',
  },
])
const loading = ref(false)
const ipagination = ref({
  current: 1,
  pageSize: 10,
  pageSizeOptions: ['5', '10', '20', '30', '100'],
  showTotal: (total, range) => {
    return range[0] + '-' + range[1] + ' 共' + total + '条'
  },
  showQuickJumper: true,
  showSizeChanger: true,
  total: 0,
})
const searchQuery = () => {}
const handleTableChange = () => {}
</script>
<style lang="scss" scoped></style>
