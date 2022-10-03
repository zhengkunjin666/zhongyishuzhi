export default {
  params: [
    {
      total: 1321,
      level_1: 1102,
      level_2: 130,
      level_3: 26,
      level_4: 25,
      level_5: 38,
    },
  ],
  config: {
    height: 500,
    radius: [15, 65],
    series: [
      { name: "了解", field_name: "level_1" },
      { name: "熟悉", field_name: "level_2" },
      { name: "掌握", field_name: "level_3" },
      { name: "精通", field_name: "level_4" },
      { name: "专家", field_name: "level_5" },
    ],
    roseType: "area",
    typeName: "饼图",
    widthNum: 6,
    showLabel: true,
    showLegend: true,
    showTooltip: true,
  },
};
