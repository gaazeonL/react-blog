import React, { lazy, Suspense } from "react";
import { RouteObject, Navigate } from "react-router";
import { singeMenu } from "@store/system/type";

const LazyComponent = (props: {
  component: React.LazyExoticComponent<
    React.MemoExoticComponent<() => JSX.Element>
  >;
}) => (
  <Suspense fallback={<></>}>{React.createElement(props.component)}</Suspense>
);
export function menuToRoutes(menus: singeMenu[]) {
  const routes: RouteObject[] = [];
  menus.forEach((menu) => {
    menu.children && routes.push(...menuToRoutes(menu.children));
    if (menu.component && typeof menu.url === "string") {
      const url = menu.url;
      const Component = lazy(
        () =>
          // import(
          //   "./" +
          //     url.split("/").slice(1, -1).join("/") +
          //     (url.split("/").slice(1, -1).length ? "/" : "") +
          //     menu.component +
          //     "/index.tsx"
          // )
          import(
            `./${
              url.split("/").slice(1, -1).join("/") +
              (url.split("/").slice(1, -1).length ? "/" : "") +
              menu.component
            }/index.tsx`
          )
      ) as React.LazyExoticComponent<
        React.MemoExoticComponent<() => JSX.Element>
      >;
      routes.push({
        path: menu.url as string,
        element: <LazyComponent component={Component}></LazyComponent>,
      });
    }
  });
  return routes;
}
