import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { changeKeyPath } from "@store/system";
export default function () {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const keyPath = location.pathname.split("/").reverse();
    keyPath.pop();
    dispatch(changeKeyPath(keyPath));
  }, []);
}
