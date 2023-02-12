// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, PieChart, TreeChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  // TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  PolarComponent,
} from "echarts/components";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
// 注册必须的组件
echarts.use([
  // TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  PolarComponent,
  BarChart,
  PieChart,
  TreeChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);
echarts.registerTheme("chalk", {
  color: [
    "#fc97af",
    "#87f7cf",
    "#f7f494",
    "#72ccff",
    "#f7c5a0",
    "#d4a4eb",
    "#d2f5a6",
    "#76f2f2",
  ],
  backgroundColor: "#292a2d",
  textStyle: {},
  title: {
    textStyle: {
      color: "#ffffff",
    },
    subtextStyle: {
      color: "#dddddd",
    },
  },
  line: {
    itemStyle: {
      borderWidth: "4",
    },
    lineStyle: {
      width: "3",
    },
    symbolSize: "0",
    symbol: "circle",
    smooth: true,
  },
  radar: {
    itemStyle: {
      borderWidth: "4",
    },
    lineStyle: {
      width: "3",
    },
    symbolSize: "0",
    symbol: "circle",
    smooth: true,
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: "#ccc",
    },
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
  },
  candlestick: {
    itemStyle: {
      color: "#fc97af",
      color0: "transparent",
      borderColor: "#fc97af",
      borderColor0: "#87f7cf",
      borderWidth: "2",
    },
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: "#ccc",
    },
    lineStyle: {
      width: "1",
      color: "#ffffff",
    },
    symbolSize: "0",
    symbol: "circle",
    smooth: true,
    color: [
      "#fc97af",
      "#87f7cf",
      "#f7f494",
      "#72ccff",
      "#f7c5a0",
      "#d4a4eb",
      "#d2f5a6",
      "#76f2f2",
    ],
    label: {
      color: "#293441",
    },
  },
  map: {
    itemStyle: {
      areaColor: "#f3f3f3",
      borderColor: "#999999",
      borderWidth: 0.5,
    },
    label: {
      color: "#893448",
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(255,178,72,1)",
        borderColor: "#eb8146",
        borderWidth: 1,
      },
      label: {
        color: "rgb(137,52,72)",
      },
    },
  },
  geo: {
    itemStyle: {
      areaColor: "#f3f3f3",
      borderColor: "#999999",
      borderWidth: 0.5,
    },
    label: {
      color: "#893448",
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(255,178,72,1)",
        borderColor: "#eb8146",
        borderWidth: 1,
      },
      label: {
        color: "rgb(137,52,72)",
      },
    },
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#666666",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333",
      },
    },
    axisLabel: {
      show: true,
      color: "#aaaaaa",
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ["#e6e6e6"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#666666",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333",
      },
    },
    axisLabel: {
      show: true,
      color: "#aaaaaa",
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ["#e6e6e6"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
      },
    },
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#666666",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333",
      },
    },
    axisLabel: {
      show: true,
      color: "#aaaaaa",
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ["#e6e6e6"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#666666",
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: "#333",
      },
    },
    axisLabel: {
      show: true,
      color: "#aaaaaa",
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ["#e6e6e6"],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
      },
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: "#999999",
    },
    emphasis: {
      iconStyle: {
        borderColor: "#666666",
      },
    },
  },
  legend: {
    textStyle: {
      color: "#999999",
    },
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: "#cccccc",
        width: 1,
      },
      crossStyle: {
        color: "#cccccc",
        width: 1,
      },
    },
  },
  timeline: {
    lineStyle: {
      color: "#87f7cf",
      width: 1,
    },
    itemStyle: {
      color: "#87f7cf",
      borderWidth: 1,
    },
    controlStyle: {
      color: "#87f7cf",
      borderColor: "#87f7cf",
      borderWidth: 0.5,
    },
    checkpointStyle: {
      color: "#fc97af",
      borderColor: "#fc97af",
    },
    label: {
      color: "#87f7cf",
    },
    emphasis: {
      itemStyle: {
        color: "#f7f494",
      },
      controlStyle: {
        color: "#87f7cf",
        borderColor: "#87f7cf",
        borderWidth: 0.5,
      },
      label: {
        color: "#87f7cf",
      },
    },
  },
  visualMap: {
    color: ["#fc97af", "#87f7cf"],
  },
  dataZoom: {
    backgroundColor: "rgba(255,255,255,0)",
    dataBackgroundColor: "rgba(114,204,255,1)",
    fillerColor: "rgba(114,204,255,0.2)",
    handleColor: "#72ccff",
    handleSize: "100%",
    textStyle: {
      color: "#333333",
    },
  },
  markPoint: {
    label: {
      color: "#293441",
    },
    emphasis: {
      label: {
        color: "#293441",
      },
    },
  },
});

export default echarts;
