//react引入
import { memo } from "react";
//redux引入
import { useSelector } from "react-redux";
import { storeType } from "@store/type";
import { singeMenu } from "@store/system/type";
//react-router引入
import { useRoutes, Navigate } from "react-router-dom";
//根据菜单获取路由表引入
import { menuToRoutes } from "@pages/index";

const Getroutes = memo(() => {
  const menu = useSelector<storeType, singeMenu[]>(
    (store) => store.system.menuControl.data
  );
  const routes = menuToRoutes(menu);
  routes.push({
    path: "/",
    element: <Navigate to="/read"></Navigate>,
  });
  routes.push({
    path: "*",
    element: <Navigate to="/read"></Navigate>,
  });
  return useRoutes(routes);
});

export default Getroutes;
