<template>
  <a-breadcrumb class="bread-crumb">
    <a-breadcrumb-item>专家团队</a-breadcrumb-item>
    <a-breadcrumb-item>专家人才库</a-breadcrumb-item>
  </a-breadcrumb>
  <section class="expert-sectiion">
    <div class="expert-top">
      <span class="expert-title">专家人才库</span>
      <router-link :to="{ path: '/expert/enter' }">
        <a-button class="expert-btn" type="primary">
          <template #icon><plus-outlined /></template>
          录入专家
        </a-button>
      </router-link>
    </div>
    <div class="expert-bottom">
      <div class="search-container">
        <a-form layout="inline">
          <a-form-item>
            <a-input
              class="expert-input"
              v-model:value="modelRef.id"
              placeholder="工号"
            />
          </a-form-item>
          <a-form-item>
            <a-input
              class="expert-input"
              v-model:value="modelRef.name"
              placeholder="姓名"
            />
          </a-form-item>
          <a-form-item>
            <a-input
              class="expert-select"
              v-model:value="modelRef.company"
              placeholder="请输入公司"
            />
            <!-- <a-select
              v-model:value="modelRef.company"
              placeholder="请选择公司"
              allowClear
            >
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select> -->
          </a-form-item>
          <a-form-item>
            <a-input
              class="expert-select"
              v-model:value="modelRef.industry"
              placeholder="请输入行业"
            />
            <!-- <a-select
              v-model:value="modelRef.industry"
              placeholder="请选择行业"
              allowClear
            >
            </a-select> -->
          </a-form-item>
          <a-form-item>
            <a-input
              class="expert-select"
              v-model:value="modelRef.station"
              placeholder="请输入岗位"
            />
            <!-- <a-select
              v-model:value="modelRef.station"
              placeholder="请选择岗位"
              allowClear
            >
            </a-select> -->
          </a-form-item>
          <a-form-item>
            <a-input
              class="expert-select"
              v-model:value="modelRef.major"
              placeholder="请输入产品领域"
            />
            <!-- <a-select
              v-model:value="modelRef.major"
              placeholder="请选择产品领域"
              allowClear
            >
            </a-select> -->
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click.prevent="handleSubmit"
              >查询</a-button
            >
            <a-button style="margin-left: 8px" @click="handleReset"
              >重置</a-button
            >
          </a-form-item>
        </a-form>
        <a-button @click="handleExport">导出</a-button>
      </div>
      <div class="table-container">
        <a-table
          :ref="exportTableRef"
          :columns="columns"
          :row-key="(record) => record.id"
          :data-source="data.experts"
          :pagination="data.pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'operate'">
              <router-link :to="{ path: `/expert/detail/index/${record.id}` }"
                >详情</router-link
              >
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import Experts from "@/global/service/experts.js";
import { reactive, ref, onMounted } from "vue";
import * as XLSX from "xlsx/xlsx.mjs";

const modelRef = reactive({
  id: null,
  name: null,
  company: null,
  industry: null,
  station: null,
  major: null,
  page: null,
  page_size: 10,
});
const data = reactive({
  experts: [],
  pagination: {},
});
const exportTableRef = ref(null);
const loading = ref(false);
const columns = [
  {
    title: "工号",
    dataIndex: "id",
    width: "5%",
  },
  {
    title: "姓名",
    dataIndex: "name",
    width: "8%",
  },
  {
    title: "公司",
    dataIndex: "company",
    width: "10%",
  },
  {
    title: "行业",
    dataIndex: "industry",
    ellipsis: true,
  },
  {
    title: "岗位",
    dataIndex: "station",
    width: "10%",
  },
  {
    title: "产品领域",
    dataIndex: "major",
    ellipsis: true,
  },
  {
    title: "岗位技能等级",
    dataIndex: "stack_level",
    width: "10%",
  },
  {
    title: "总技能力",
    dataIndex: "stack_value",
    width: "8%",
  },
  {
    title: "测评技能数",
    dataIndex: "stacks_count",
    width: "8%",
  },
  {
    title: "操作",
    dataIndex: "operate",
    width: "5%",
  },
];
onMounted(() => {
  getExperts();
});
const getExperts = () => {
  loading.value = true;
  const params = { ...modelRef };
  Experts.getExpertList(params).then((res) => {
    data.experts = res.data.list;
    const total = res.data.pagination.total;
    const current = res.data.pagination.current_page;
    const pageSize = Number(res.data.pagination.per_page);
    const showQuickJumper = true;
    const showSizeChanger = true;
    data.pagination = {
      total,
      current,
      pageSize,
      showQuickJumper,
      showSizeChanger,
    };
    loading.value = false;
  });
};
const handleSubmit = () => {
  modelRef.page = null;
  modelRef.page_size = 10;
  getExperts();
};
const handleReset = () => {
  modelRef.id = null;
  modelRef.name = null;
  modelRef.company = null;
  modelRef.industry = null;
  modelRef.station = null;
  modelRef.major = null;
};
const handleExport = () => {
  const params = { ...modelRef };
  params.page_size = data.pagination.total;
  Experts.getExpertList(params).then((res) => {
    const experts = res.data.list;
    const columnsList = columns.filter((data) => data.dataIndex != "operate");
    const tableData = transData(columnsList, experts);
    // 将一组 JS 数据数组转换为工作表
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    // 创建 workbook
    const wb = XLSX.utils.book_new();
    // 将 工作表 添加到 workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // 将 workbook 写入文件
    XLSX.writeFile(wb, "experts.xlsx");
  });
};
const transData = (columns, tableList) => {
  const obj = columns.reduce((acc, cur) => {
    if (!acc.titles && !acc.keys) {
      acc.titles = [];
      acc.keys = [];
    }
    acc.titles.push(cur.title);
    acc.keys.push(cur.dataIndex);
    return acc;
  }, {});
  const tableBody = tableList.map((item) => {
    return obj.keys.map((key) => item[key]);
  });
  return [obj.titles, ...tableBody];
};
const handleTableChange = (params) => {
  modelRef.page = params.current;
  modelRef.page_size = params.pageSize;
  data.pagination.current = params.current;
  data.pagination.pageSize = Number(params.pageSize);
  getExperts();
};
</script>

<style lang="less" scoped>
.expert-sectiion {
  margin-top: 24px;
  background: #fff;
  .expert-top {
    height: 58px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .expert-title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
    }
  }
  .expert-bottom {
    padding: 24px;
    :deep(.ant-form-item) {
      margin-right: 8px;
      .expert-input {
        width: 122px;
      }
      .expert-select {
        width: 160px;
      }
    }
  }
  .search-container {
    display: flex;
    justify-content: space-between;
  }
  .table-container {
    margin-top: 16px;
    :deep(.ant-table-cell) {
      white-space: nowrap;
    }
    :deep(.ant-table-pagination.ant-pagination) {
      margin: 24px 0px 0px 0px;
    }
  }
}
:global(.ant-table-content
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before) {
  width: 0;
}
</style>
