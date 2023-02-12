import { useSelector } from "react-redux";
import { singeMenu } from "@store/system/type";
import { storeType } from "@store/type";
import { useLocation } from "react-router-dom";
export default function (verify: string) {
  const location = useLocation();
  const menu = useSelector<storeType, singeMenu[]>(
    (state) => state.system.menuControl.data
  );
  let verifyTarget = undefined;
  const keyPath = location.pathname.split("/");
  keyPath.shift();
  let target = menu;
  keyPath.forEach((key, index) => {
    const findTargetValue = findTarget(target, key, index);
    if (findTargetValue) {
      target = findTargetValue;
    }
  });
  verifyTarget = target.find((item) => {
    return item.key === verify;
  });
  if (verifyTarget) {
    return true;
  } else {
    return false;
  }
}
function findTarget(target: singeMenu[], key: string, index: number) {
  return target.find((item) => {
    if (item.url) {
      let url = item.url.split("/");
      url.shift();
      if (url[index][0] === ":") {
        return true;
      }
      if (url[index] === key) {
        return true;
      }
    }
  })?.children;
}
