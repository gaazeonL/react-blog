//react引入
import { memo, useRef, useState } from "react";
//react-dom引入
import ReactDOM from "react-dom";
//antd引入
import Card from "antd/lib/card";
import Button from "antd/lib/button";
import { CloseOutlined } from "@ant-design/icons";
//全局方法引入
import jsonDeepCopy from "@utils/jsonDeepCopy";
//组件内部引入
import { ZoomCloackStyle, ZoomChartStyle, ZoomButtonStyle } from "./style";
import { drawChart, getChartProps } from "./props";
import { FromFatherProps } from "./type";

const Zoom = memo((props: { show: () => void; chart: FromFatherProps }) => {
  //这里的表格大小需要自适应，所以既要传过来的data，还要把style抹去(把宽高设置成-1就会抹去)
  const _props = jsonDeepCopy(props.chart);
  _props.chartStyle = {
    width: -1,
    height: -1,
  };
  const chartProps = drawChart(_props);
  return ReactDOM.createPortal(
    <div>
      <ZoomButtonStyle>
        <Button shape="circle" onClick={() => props.show()}>
          <CloseOutlined />
        </Button>
      </ZoomButtonStyle>
      <ZoomCloackStyle onClick={() => props.show()}></ZoomCloackStyle>
      <ZoomChartStyle {...chartProps}></ZoomChartStyle>
    </div>,
    document.body
  );
});
const GzChart = memo((props: FromFatherProps) => {
  const style = props.chartStyle;
  const curHeight = useRef(props.chartStyle?.height);
  const chartProps = drawChart(props);
  const ref = useRef<HTMLDivElement>(null);
  const [zoomIsShow, setZoomIsShow] = useState(false);
  const changeShow = () => {
    setZoomIsShow(!zoomIsShow);
  };
  const ChartProps = getChartProps(props, chartProps, curHeight, changeShow);
  return (
    <div
      style={{
        padding: style?.padding ? style.padding : 20,
        overflow: "hidden",
        minWidth: 425,
      }}
      ref={ref}
    >
      <Card {...ChartProps} style={{ overflow: "hidden" }}>
        <Card.Meta description={props.description}></Card.Meta>
      </Card>
      {zoomIsShow ? <Zoom show={changeShow} chart={props} /> : <></>}
    </div>
  );
});
export default GzChart;
