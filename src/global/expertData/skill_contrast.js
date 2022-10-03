export default {
  params: [
    {
      level: "了解",
      self_count: 553,
      eva_count: 1102,
    },
    {
      level: "熟悉",
      self_count: 346,
      eva_count: 130,
    },
    {
      level: "掌握",
      self_count: 231,
      eva_count: 26,
    },
    {
      level: "精通",
      self_count: 92,
      eva_count: 25,
    },
    {
      level: "专家",
      self_count: 99,
      eva_count: 38,
    },
  ],
  config: {
    xAxis: { name: "", type: "value", inverse: false, field_name: "level" },
    yAxis: { name: "测评次数" },
    height: 500,
    series: [
      { name: "自评", stack: false, field_name: "self_count" },
      { name: "测评", stack: false, field_name: "eva_count" },
    ],
    showGrid: true,
    showZoom: false,
    typeName: "柱状图",
    widthNum: 6,
    showLegend: true,
    showTooltip: true,
  },
};
