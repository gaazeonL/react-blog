import { singeMenu } from "@store/system/type";
export default function keyPathToURL(keyPath: string[], menus: singeMenu[]) {
    let cur = [...menus] as any;
    let res = "";
    keyPath = [...keyPath].reverse();
    keyPath.forEach((key) => {
      cur = cur.find((menu: any) => {
        return menu.key === key;
      }) as any;
      if (cur.children) {
        cur = cur.children;
      }
      res = cur.url;
    });
    return res;
  }
  