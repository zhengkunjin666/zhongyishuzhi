<template>
  <a-breadcrumb class="bread-crumb">
    <a-breadcrumb-item>专家团队</a-breadcrumb-item>
    <a-breadcrumb-item>专家数据</a-breadcrumb-item>
  </a-breadcrumb>
  <a-range-picker class="date-picker" v-model:value="value" separator="至">
  </a-range-picker>
  <section class="expert-data">
    <h2 class="expert-data-title h2-title">数据概览</h2>
    <div class="expert-data-list">
      <div class="expert-data-item" v-for="item in expertData" :key="item.text">
        <p class="item-count">{{ item.count }}</p>
        <p class="item-content">
          <span class="item-text">{{ item.text }}</span>
          <a-tooltip placement="bottom">
            <template #title>{{ item.title }}</template>
            <svg-icon svgClass="item-icon" svgName="InfoFilled"></svg-icon>
          </a-tooltip>
        </p>
      </div>
    </div>
  </section>
  <section class="expert-level">
    <h2 class="expert-level-title h2-title">技能水平</h2>
    <div class="level-list">
      <div class="level-item">
        <div ref="levelLeft" style="height: 430px"></div>
      </div>
      <div class="level-item">
        <div ref="levelRight" style="height: 430px"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onUpdated, onMounted } from "vue";
//  按需引入 echarts
import * as echarts from "echarts";

const value = ref(null);
const expertData = reactive([
  { count: 201, text: "技能数", title: "管理后台技能列表技能数量" },
  { count: 273, text: "技能测评人数", title: "完成技能测评人数" },
  {
    count: 806,
    text: "测评总次数",
    title:
      "公司下所有技能点被测评次数之和（同一个技能点被同一个人测评多次只算一次）",
  },
  {
    count: "3,826.91",
    text: "总技能力",
    title:
      "总技能力 = 技能掌握程度为专家的个数 * 100 + 技能掌握程度为精通的个数 * 10 + 技能掌握程度为掌握的个数 * 1 + 技能掌握程度为熟悉的个数 * 0.1 + 技能掌握程度为了解的个数 * 0.01",
  },
  { count: 97, text: "被测技能数", title: "被学员测评过的技能数量" },
  { count: "31.87%", text: "技能测评率", title: "技能测评人数/激活用户数" },
  { count: 7.327, text: "人均测评技能数", title: "测评总次数/技能测评人数" },
  { count: 34.79, text: "人均技能力", title: "总技能力/技能测评人数" },
]);
const levelLeft = ref();
const levelRight = ref();
let levelLeftChart;
let levelRightChart;
onUpdated(
  (window.onresize = () => {
    levelLeftChart.resize();
    levelRightChart.resize();
  })
);
onMounted(() => {
  levelLeftInit();
  levelRightInit();
});
const levelLeftInit = () => {
  // 基于准备好的dom，初始化echarts实例
  levelLeftChart = echarts.init(levelLeft.value);
  // 指定图表的配置项和数据
  const option = {
    title: {
      text: "自评测评对比",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["自评", "测评"],
      icon: "circle",
      top: "8%",
    },
    grid: {
      top: "26%",
      bottom: "7%",
    },
    xAxis: {
      data: ["了解", "熟悉", "精通", "掌握", "专家"],
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: [
      {
        name: "测评次数",
      },
      {
        position: "left",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#e0e6f1",
          },
        },
      },
      {
        axisLine: {
          show: true,
          lineStyle: {
            color: "#e0e6f1",
          },
        },
      },
    ],
    series: [
      {
        name: "自评",
        type: "bar",
        data: [550, 350, 230, 90, 100],
      },
      {
        name: "测评",
        type: "bar",
        data: [1100, 120, 20, 20, 30],
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  levelLeftChart.setOption(option);
};
const levelRightInit = () => {
  // 基于准备好的dom，初始化echarts实例
  levelRightChart = echarts.init(levelRight.value);
  // 指定图表的配置项和数据
  const option = {
    title: {
      text: "自评水平分布",
    },
    legend: {
      icon: "circle",
      top: "8%",
    },
    tooltip: {
      formatter: function (params) {
        return `<p style="height:10px;">${params.marker}${params.name}</p>
                <p style="height:10px;">占比：${params.percent}%</p>
                <p style="height:10px;">数值：${params.value}</p>
              `;
      },
    },
    series: [
      {
        name: "level",
        type: "pie",
        radius: [30, 150],
        center: ["50%", "50%"],
        roseType: "area",
        top: "20%",
        data: [
          { value: 1100, name: "了解" },
          { value: 120, name: "熟悉" },
          { value: 20, name: "掌握" },
          { value: 20, name: "精通" },
          { value: 30, name: "专家" },
        ],
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  levelRightChart.setOption(option);
};
</script>

<style lang="less" scoped>
.date-picker {
  margin-top: 20px;
  :deep(input) {
    text-align: center;
  }
}
.expert-data {
  min-width: 830px;
  margin-top: 30px;
  .expert-data-list {
    display: flex;
    flex-wrap: wrap;

    .expert-data-item {
      width: calc(100% / 4 - 15px);
      height: 180px;
      background: #fff;
      padding: 20px;
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(4n) {
        margin-right: 0;
      }
      &:hover {
        z-index: 2;
        box-shadow: 5px 20px 30px rgb(0 0 0 / 10%);
      }
      p {
        margin-left: 20px;
      }
      .item-count {
        height: 56px;
        font-size: 36px;
        font-family: HelveticaNeue-Medium, HelveticaNeue;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        line-height: 56px;
        margin-bottom: 0;
      }
      .item-content {
        white-space: nowrap;
        .item-text {
          height: 24px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #909399;
          line-height: 24px;
          margin-right: 4px;
        }
        .item-icon {
          color: #909399;
          cursor: pointer;
          &:hover {
            color: #2156d7;
          }
        }
      }
    }
  }
}
.expert-level {
  margin-top: 30px;
  .level-list {
    display: flex;
    .level-item {
      width: 50%;
      height: 500px;
      background: #fff;
      padding: 20px;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
