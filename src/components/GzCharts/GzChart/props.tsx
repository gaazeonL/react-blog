//react引入
import React, { useEffect, useRef, CSSProperties, useState } from "react";
//redux引入
import { useSelector } from "react-redux";
import { storeType } from "@store/type";
import echarts from "@global/echarts";
//antd引入
import Card from "antd/lib/card";
import Button from "antd/lib/button";
import {
  CloseOutlined,
  ZoomInOutlined,
  UpSquareOutlined,
} from "@ant-design/icons";
//组件内部引入
import { FromFatherProps, getChartPropsType } from "./type";

export const drawChart = function (props: FromFatherProps) {
  const theme = useSelector<storeType, boolean>(
    (state) => state.system.globalControl.theme
  );
  const ref = useRef<HTMLDivElement>(null);
  //默认宽高375px
  const style: CSSProperties = {
    width: "375px",
    height: "375px",
    // transition: "all 0.2s ease 0s",
  };
  if (props.chartStyle?.width) {
    if (props.chartStyle.width === -1) {
      delete style.width;
    } else {
      style.width = props.chartStyle?.width;
    }
  }
  if (props.chartStyle?.height) {
    if (props.chartStyle.width === -1) {
      delete style.height;
    } else {
      style.height = props.chartStyle?.height;
    }
  }
  useEffect(() => {
    //异步数据优化，避免chart重复渲染
    if (props.async) {
      return;
    }
    if (props.chartStyle?.height === "0px") {
      echarts.dispose(ref.current as HTMLDivElement);
      return;
    }
    if (ref.current?.getAttribute("_echarts_instance_")) {
      echarts.dispose(ref.current as HTMLDivElement);
    }
    let charts;
    if (theme) {
      charts = echarts.init(ref.current as HTMLDivElement);
    } else {
      charts = echarts.init(ref.current as HTMLDivElement, "chalk");
    }
    charts.setOption(props.chartOption);
  }, [theme, props]);
  return {
    ref,
    style,
  };
};
export const getChartProps: getChartPropsType = (
  props,
  chartProps,
  curHeight,
  changeShow
) => {
  const style = props.chartStyle;
  useEffect(() => {
    if (props.removeCallBack) {
      return props.removeCallBack;
    }
  }, []);
  const cover = <div {...chartProps}></div>;
  const extra = (
    <div>
      {/*  缩放按钮 */}
      {props.zoomBtn === undefined || props.zoomBtn === true ? (
        <Button onClick={() => changeShow()} type="text">
          <ZoomInOutlined />
        </Button>
      ) : (
        <></>
      )}
      {/*  卡片缩放按钮 */}
      {props.collapsedBtn ? (
        <Button
          onClick={() => {
            props.collapsedFn ? props.collapsedFn(props.id, curHeight) : "";
          }}
          type="text"
        >
          <UpSquareOutlined rotate={props.collapsed ? 180 : 0} />
        </Button>
      ) : (
        <></>
      )}
      {/* 移除按钮 */}
      {props.removeFn ? (
        props.removeBtn ? (
          <Button
            type="text"
            onClick={() => {
              props.removeFn ? props.removeFn(props.id) : "";
            }}
          >
            <CloseOutlined />
          </Button>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </div>
  );
  return {
    title: props.title,
    hoverable: true,
    style: {
      maxWidth: style?.width ? style.width : 375,
    },
    cover,
    extra,
  };
};
