<template>
  <header class="project-header">
    <div class="header-left">
      <router-link :to="{ path: '/' }" class="index-link">
        <img
          src="@/assets/images/logo-light.png"
          alt="中国移动"
          class="index-logo"
        />
      </router-link>
    </div>
    <div class="header-right">
      <LayoutNav :subMenu="subMenu" />
    </div>
  </header>
  <main class="project-body">
    <div class="project-container">
      <section class="count-sectiion">
        <h2 class="count-title h2-title">项目统计</h2>
        <div class="count-list">
          <div class="count-item">
            <p class="count-text">累计项目</p>
            <p class="count-num">
              <span class="count-num-large">{{ data.countData.project_count }}</span>
              <span class="count-num-text">个</span>
            </p>
          </div>
          <div class="count-item">
            <p class="count-text">累计工时</p>
            <p class="count-num">
              <span class="count-num-large">{{ data.countData.work_count }}</span>
              <span class="count-num-text">周</span>
            </p>
          </div>
          <div class="count-item">
            <p class="count-text">参与专家</p>
            <p class="count-num">
              <span class="count-num-large">{{
                data.countData.expert_count
              }}</span>
              <span class="count-num-text">人</span>
            </p>
          </div>
        </div>
      </section>
      <section class="list-sectiion">
        <div class="list-top">
          <h2 class="list-title h2-title">项目列表</h2>
          <a-button class="expert-btn" type="primary" @click="handleClick(null)">
            <template #icon><plus-outlined /></template>
            录入项目
          </a-button>
        </div>
        <div class="list-container">
          <a-table
            :ref="exportTableRef"
            :columns="columns"
            :row-key="(record) => record.id"
            :data-source="data.projects"
            :pagination="data.pagination"
            :loading="loading"
            @change="handleTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex  === 'operate'">
                <a @click="handleClick(record.id)">详情</a>
              </template>
              <template v-if="column.dataIndex  === 'period'">
                <span>{{ record.period }}周</span>
              </template>
            </template>
          </a-table>
        </div>
        <modalShow v-model:visible="modalVisible" v-model:id="id" />
      </section>
    </div>
  </main>
</template>

<script setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import modalShow from "./widgets/ProjectDetailOrEnter.vue";
import { reactive, ref, onMounted } from "vue";
import Projects from "@/global/service/projects.js";

const data = reactive({
  countData: {},
  projects: [],
  pagination: {},
});
const exportTableRef = ref(null);
const subMenu = ref("expert-sub-menu");
const loading = ref(false);
const columns = [
  {
    title: "项目id",
    dataIndex: "id",
    width: "8%",
  },
  {
    title: "项目名称",
    dataIndex: "name",
    ellipsis: true,
  },
  {
    title: "参与人数",
    dataIndex: "expert_number",
    width: "8%",
  },
  {
    title: "启动时间",
    dataIndex: "begin_date",
    width: "10%",
  },
  {
    title: "项目状态",
    dataIndex: "status_desc",
    width: "10%",
  },
  {
    title: "行业",
    dataIndex: "industry",
    width: "10%",
  },
  {
    title: "产品领域",
    dataIndex: "domain",
    width: "10%",
  },
  {
    title: "周期/时长",
    dataIndex: "period",
    width: "10%",
  },
  {
    title: "操作",
    dataIndex: "operate",
    width: "8%",
  },
];
const page = ref(1);
const page_size = ref(10);
const modalVisible = ref(false);
const id = ref(null);
onMounted(() => {
  getProjects();
});
const getProjects = () => {
  loading.value = true;
  Projects.getProjectList({ page: page.value, page_size: page_size.value }).then((res) => {
    console.log(res)
    data.countData = res.data.extra_info;
    data.projects = res.data.list;
    const total = res.data.pagination.total;
    const current = res.data.pagination.current_page;
    const pageSize = Number(res.data.pagination.per_page);
    const showQuickJumper = true;
    const showSizeChanger = true;
    data.pagination = { total, current, pageSize, showQuickJumper, showSizeChanger };
    loading.value = false;
  });
};
const handleTableChange = (params) => {
  page.value =  params.current;
  page_size.value =  params.pageSize;
  data.pagination.current = params.current;
  data.pagination.pageSize = Number(params.pageSize);
  getProjects();
};
const handleClick = (detailId) => {
  modalVisible.value = true;
  id.value = detailId;
};
</script>

<style lang="less" scoped>
.project-header {
  min-width: 1200px;
  height: 72px;
  background: #fff;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  .header-left {
    margin-left: 24px;
  }
  .header-right {
    margin-left: 56px;
    .ant-menu-horizontal {
      border: none;
    }
    :deep(.ant-menu-item),
    :deep(.ant-menu-submenu) {
      height: 71px;
      line-height: 71px;
    }
  }
}
.project-container {
  min-width: 1200px;
  padding: 24px;
  .count-list {
    display: flex;
    .count-item {
      width: 40%;
      height: 170px;
      background: #fafafa;
      border-radius: 2px;
      margin-right: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    
      &:last-child {
        margin-right: 0;
      }
    
      .count-num {
        margin-top: 8px;
        margin-bottom: 0;
    
        .count-num-large {
          height: 48px;
          font-size: 40px;
          font-family: DINCondensed-Bold, DINCondensed;
          font-weight: bold;
          line-height: 48px;
          margin-right: 8px;
        }
    
        .count-num-text {
          width: 22px;
          height: 24px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          line-height: 24px;
        }
      }
    
      .count-text {
        height: 24px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
        line-height: 24px;
        margin-bottom: 0;
      }
    }
  }
  .list-sectiion {
    margin-top: 24px;
    .list-top {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
