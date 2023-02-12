//react引入
import { memo } from "react";
//redux引入
import { storeType } from "@store/type";
import { useSelector } from "react-redux";
import { treeNode } from "@store/aboutme/type";
//antd引入
import Title from "antd/lib/typography/Title";
import Divider from "antd/lib/divider";
import Tag from "antd/lib/tag";
//i18n引入
import { useTranslation } from "react-i18next";
//hooks引入
import changekeyPath from "@hooks/changekeyPath";
//外部组件引入
import GzCharts from "@components/GzCharts";
//组件内部引用
import StyleAboutMe from "./style";
import {
  getAboutMe,
  getTreeChartData,
  getDetailedTechnologyStack,
  getProjectIntroduction,
} from "./props";
/*------------------------------------------------------------------------------
以上为引用层
------------------------------------------------------------------------------*/
const AboutMe = memo(() => {
  getAboutMe();
  changekeyPath();
  const { t } = useTranslation();
  const treeChartData = getTreeChartData();
  const detailedTechnologyStackData = getDetailedTechnologyStack();
  const projectIntroduction = getProjectIntroduction();
  const data = useSelector<storeType, treeNode>(
    (store) => store.aboutme.data.technologyStack
  );
  return data.children ? (

    
    <StyleAboutMe>
      <Divider orientation="left">
        <Title>{t("pages.aboutMe.personal_TS_overview.title")}</Title>
      </Divider>
      <GzCharts data={treeChartData}></GzCharts>
      <Divider orientation="left">
        <Title>{t("pages.aboutMe.personal_TS_details.title")}</Title>
      </Divider>
      <GzCharts data={detailedTechnologyStackData}></GzCharts>
      <Divider orientation="left">
        <Title level={2}>{t("pages.aboutMe.projectTS.title")}</Title>
      </Divider>
      <div className="project-introduction">
        {projectIntroduction.map((item) => {
          return (
            <Tag key={item.name} color={item.color}>
              {item.name}
            </Tag>
          );
        })}
      </div>
    </StyleAboutMe>
  ) : (
    <></>
  );
});
export default AboutMe;
