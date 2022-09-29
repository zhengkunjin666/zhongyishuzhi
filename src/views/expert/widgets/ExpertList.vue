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
              v-model:value="modelRef.no"
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
            <a-select
              v-model:value="modelRef.company"
              placeholder="请选择公司"
              allowClear
            >
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select
              v-model:value="modelRef.industry"
              placeholder="请选择行业"
              allowClear
            >
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select
              v-model:value="modelRef.station"
              placeholder="请选择岗位"
              allowClear
            >
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select
              v-model:value="modelRef.major"
              placeholder="请选择产品领域"
              allowClear
            >
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
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
          show-quick-jumper
          :loading="loading"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex  === 'operate'">
              <router-link :to = "{ path: `/expert/detail/index/${record.id}` }">详情</router-link>
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
  no: null,
  name: null,
  company: null,
  industry: null,
  station: null,
  major: null,
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
    ellipsis: true,
  },
  {
    title: "行业",
    dataIndex: "industry",
    width: "10%",
  },
  {
    title: "岗位",
    dataIndex: "station",
    width: "10%",
  },
  {
    title: "产品领域",
    dataIndex: "major",
    width: "10%",
  },
  {
    title: "岗位技能等级",
    dataIndex: "stack_level",
    width: "10%",
  },
  {
    title: "总技能力",
    dataIndex: "stack_value",
    width: "10%",
  },
  {
    title: "测评技能数",
    dataIndex: "stacks_count",
    width: "10%",
  },
  {
    title: "操作",
    dataIndex: "operate",
    width: "10%",
  },
];
onMounted(() => {
  getExperts();
});
const getExperts = () => {
  loading.value = true;
  const params = { ...modelRef };
    console.log(params);
  Experts.getExpertList(params).then((res) => {
    console.log(res);
    data.experts = res.data.list;
    const total = res.data.pagination.total;
    const current = res.data.pagination.current_page;
    const pageSize = res.data.pagination.per_page;
    data.pagination = { total, current, pageSize };
    loading.value = false;
  });
};
const handleSubmit = () => {
  getExperts();
};
const handleReset = () => {
  modelRef.no = null;
  modelRef.name = null;
  modelRef.company = null;
  modelRef.industry = null;
  modelRef.station = null;
  modelRef.major = null;
};
const handleExport = () => {
  const tableData = transData(columns, data.experts);
    // 将一组 JS 数据数组转换为工作表
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    // 创建 workbook
    const wb = XLSX.utils.book_new();
    // 将 工作表 添加到 workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // 将 workbook 写入文件
    XLSX.writeFile(wb, 'table.xlsx');
}
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
    const tableBody = tableList.map(item => {
    	return obj.keys.map(key => item[key]);
    });
	return [ obj.titles, ...tableBody ];
};
</script>

<style lang="less" scoped>
.expert-sectiion {
  min-width: 1200px;
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
      .ant-form-item-control-input-content .ant-select {
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
  }
}
:global(.ant-table-content .ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before) {
  width: 0;
}
</style>
