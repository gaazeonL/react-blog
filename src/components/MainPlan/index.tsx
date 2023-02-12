//react引入
import { memo } from "react";
//redux引入
import { useSelector } from "react-redux";
import { storeType } from "@store/type";
//antd引入
import Layout from "antd/lib/layout";
//子组件引入
import GzSiderBar from "./GzSiderBar";
import GzMoveCloack from "./GzMoveCloack";
import GZTopMenu from "./GzTopMenu";
import GzHeader from "./GzHeader";
import GzContent from "./GzContent";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
export default memo(function MainPlan() {
  //判断是否矮高度，用于判断顶部菜单是否渲染
  const isShort = useSelector<storeType>(store => store.system.globalControl.isShort)
  return (
    <Layout className={"main-plan"}>
      {
      /*可以进行优化，但好像没必要*/
      /* {isShort ? <></> : <GzSiderBar />} */}
      <GzSiderBar />
      {isShort ? <></> : <GzMoveCloack />}
      <Layout>
        {isShort ? <GZTopMenu /> : <></>}
        <GzHeader />
        <GzContent />
      </Layout>
    </Layout>
  );
});
