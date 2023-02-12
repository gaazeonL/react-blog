//react引入
import { memo, useEffect, useState } from "react";
//单个chart组件引入
import GzChart from "./GzChart";
//组件内部引入
import GzChartsStyle from "./style";
import { FromFatherProps } from "./type";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
const GzCharts = memo((props: FromFatherProps) => {
  //浅拷贝传入进来的data数据，数据交给组件内管理
  const chartsProps = [...props.data];
  const [charts, setCharts] = useState(chartsProps);
  //如果图标内数据更新了，这边需要通知组件重新渲染
  useEffect(() => {
    setCharts([...props.data]);
  }, [props.data]);
  //移除组内图表方法，根据传入的ID进行移除
  const removeChild = (removeId: string) => {
    let mycharts = [...charts];
    mycharts = mycharts.filter((chart) => {
      return chart.id !== removeId;
    });
    setCharts(mycharts);
  };
  //收缩展开组内图表方法，根据传入的ID进行收缩展开
  const collapsedChild = (
    collapsedId: string,
    curHeight: {
      current: string | number | undefined;
    }
  ) => {
    let mycharts = [...charts];
    mycharts.forEach((item) => {
      if (item.id === collapsedId) {
        //如果没有设置item.chartStyle，给一个空对象
        item.chartStyle === undefined && (item.chartStyle = {});
        //如果不是0px，那就把图表变成0px，并且图表里面有方法如果高度为0px就不进行图表渲染
        if (item.chartStyle.height !== "0px") {
          item.chartStyle.height = "0px";
          item.collapsed = true;
        }
        //否则根据传入的定义高度恢复，如果没有定义高度，那么恢复成默认的375px高度
        else {
          curHeight.current
            ? (item.chartStyle.height = curHeight.current)
            : (item.chartStyle.height = "375px");
          item.collapsed = false;
        }
      }
      return item;
    });
    setCharts(mycharts);
  };
  return (
    <GzChartsStyle style={props.style}>
      {charts.map((chart) => {
        return (
          <GzChart
            key={chart.id}
            title={chart.title}
            id={chart.id}
            async={chart.async}
            chartStyle={chart.chartStyle}
            chartOption={chart.chartOption}
            description={chart.description}
            removeBtn={chart.removeBtn}
            removeFn={removeChild}
            removeCallBack={chart.removeCallBack}
            collapsed={chart.collapsed}
            collapsedBtn={chart.collapsedBtn}
            collapsedFn={collapsedChild}
            zoomBtn={chart.zoomBtn}
          />
        );
      })}
    </GzChartsStyle>
  );
});
export default GzCharts;
