//redux引用
import { useDispatch, useSelector } from "react-redux";
import { getAboutMedata } from "@store/aboutme";
import { storeType } from "@store/type";
import { useEffect } from "react";
//i18n引入
import { useTranslation } from "react-i18next";
//echarts引用
import { GzChartType } from "@components/GzCharts/type";
import { treeNode } from "@store/aboutme/type";
export const getAboutMe = function () {
  const data = useSelector<storeType, treeNode>(
    (store) => store.aboutme.data.technologyStack
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (data.children === undefined) {
      dispatch<any>(getAboutMedata());
    }
  }, []);
};
//获取个人技术栈总览数据
export const getTreeChartData: () => GzChartType[] = function () {
  const { t } = useTranslation();
  const data = useSelector<storeType, treeNode>(
    (store) => store.aboutme.data.technologyStack
  );
  
  const option: GzChartType = {
    id: "treeChart",
    title: t("pages.aboutMe.personal_TS_overview.TS_Diagram.title") as string,
    async: true,
    removeBtn: true,
    collapsedBtn: true,
    chartStyle: {
      width: "800px",
      height: "450px",
    },
    description: t(
      "pages.aboutMe.personal_TS_overview.TS_Diagram.title"
    ) as string,
    chartOption: {
      tooltip: {},
      series: [
        {
          type: "tree",
          data: [data],
          left: "10%",
          symbolSize: 10,
          label: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
            fontSize: 10,
          },
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
            },
          },
          emphasis: {
            focus: "descendant",
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    },
  };
  if (data.name !== "") {
    option.async = false;
  }
  return [option];
};
//获取个人技术栈详情数据
export const getDetailedTechnologyStack = function () {
  const { t } = useTranslation();
  const data = useSelector<storeType, treeNode>(
    (store) => store.aboutme.data.technologyStack
  );
  const baseData = data.children?.find((item) => {
    return item.name === "base";
  });
  const expandData = data.children?.find((item) => {
    return item.name === "expand";
  });
  const vueData = data.children?.find((item) => {
    return item.name === "vue";
  });
  const reactData = data.children?.find((item) => {
    return item.name === "react";
  });
  const baseChartOption: GzChartType = baseData
    ? {
        id: baseData.name,
        title: t(
          "pages.aboutMe.personal_TS_details.basicTechnologyDiagram.title"
        ) as string,
        async: true,
        description: t(
          "pages.aboutMe.personal_TS_details.basicTechnologyDiagram.description"
        ) as string,
        chartOption: {
          tooltip: {},
          xAxis: {
            type: "category",
            data: baseData.children?.map((item) => {
              return item.name;
            }),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: baseData.children?.map((item) => {
                return item.value;
              }),
              type: "bar",
            },
          ],
        },
      }
    : {
        id: "base",
        chartOption: {},
      };
  const expandChartOption: GzChartType = expandData
    ? {
        id: expandData.name,
        title: t(
          "pages.aboutMe.personal_TS_details.advancedTechnologyDiagram.title"
        ) as string,
        async: true,
        description: t(
          "pages.aboutMe.personal_TS_details.advancedTechnologyDiagram.description"
        ) as string,
        chartOption: {
          tooltip: {},
          legend: {
            bottom: "5%",
          },
          series: [
            {
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 30,
                  fontWeight: "bold",
                },
              },
              data: expandData.children,
            },
          ],
        },
      }
    : {
        id: "expand",
        chartOption: {},
      };
  const vueChartOption: GzChartType = vueData
    ? {
        id: vueData.name,
        title: t(
          "pages.aboutMe.personal_TS_details.vueTechnologyDiagram.title"
        ) as string,
        async: true,
        description: t(
          "pages.aboutMe.personal_TS_details.vueTechnologyDiagram.description"
        ) as string,
        chartOption: {
          legend: {
            bottom: "5%",
          },
          series: [
            {
              type: "pie",
              radius: ["10%", "50%"],
              center: ["50%", "50%"],
              roseType: "area",
              itemStyle: {
                borderRadius: 8,
              },
              data: vueData.children,
            },
          ],
        },
      }
    : {
        id: "vue",
        chartOption: {},
      };
  const reactChartOption: GzChartType = reactData
    ? {
        id: reactData.name,
        title: t(
          "pages.aboutMe.personal_TS_details.reactTechnologyDiagram.title"
        ) as string,
        async: true,
        description: t(
          "pages.aboutMe.personal_TS_details.reactTechnologyDiagram.description"
        ) as string,
        chartOption: {
          polar: {
            radius: [30, "80%"],
          },
          angleAxis: {
            max: 100,
            startAngle: 75,
          },
          radiusAxis: {
            type: "category",
            data: reactData.children?.map((item) => {
              return item.name;
            }),
          },
          tooltip: {},
          series: {
            type: "bar",
            data: reactData.children,
            coordinateSystem: "polar",
            label: {
              show: true,
              position: "middle",
              formatter: "{b}: {c}",
            },
          },
        },
      }
    : {
        id: "react",
        chartOption: {},
      };
  if (data.name !== "") {
    baseChartOption.async = false;
    expandChartOption.async = false;
    vueChartOption.async = false;
    reactChartOption.async = false;
  }
  return [baseChartOption, expandChartOption, vueChartOption, reactChartOption];
};
//获取项目技术栈数据
export const getProjectIntroduction = () => {
  return [
    {
      name: "react-18.2.0",
      color: "#E74C3C",
    },
    {
      name: "redux-4.2.0",
      color: "#8E44AD",
    },
    {
      name: "react-router",
      color: "#3498DB",
    },
    {
      name: "ant-design-5.0.0",
      color: "#16A085",
    },
    {
      name: "styled-components-5.3.6",
      color: "#2ECC71",
    },
    {
      name: "typescript-4.9.3",
      color: "#F39C12",
    },
    {
      name: "echarts-5.4.1",
      color: "#D35400",
    },
    {
      name: "wangeditor-5.1.23",
      color: "#f759ab",
    },
    {
      name: "i18next-22.4.9",
      color: "#ad8b00",
    },
  ];
};
