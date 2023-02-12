import { storeType } from "@store/type";
import { useSelector } from "react-redux";
export default () => {
  //自定义编辑器主题
  let theme = useSelector<storeType, boolean>((store) => {
    return store.system.globalControl.theme;
  });
  if (theme) {
    return `
            ${"" /*编辑区域背景颜色*/}
            --w-e-textarea-bg-color: #fff;
            ${"" /*编辑区域文字颜色*/}
            --w-e-textarea-color: #333;
            ${"" /*未知作用*/}
            --w-e-textarea-border-color: #ccc;
            ${"" /*编辑区域的代码块的边框颜色*/}
            --w-e-textarea-slight-border-color: #e8e8e8;
            ${"" /*未知作用*/}
            --w-e-textarea-slight-color: #d4d4d4;
            ${"" /*编辑区域的代码块的背景颜色*/}
            --w-e-textarea-slight-bg-color: #f5f2f0;
            ${"" /*编辑区域的选中的边框颜色；例如分割线*/}
            --w-e-textarea-selected-border-color: #B4D5FF;
            ${"" /*未知作用*/}
            --w-e-textarea-handler-bg-color: #4290f7;
            ${"" /*工具栏区文字颜色*/}
            --w-e-toolbar-color: #595959;
            ${"" /*工具栏区背景颜色*/}
            --w-e-toolbar-bg-color: #fff;
            ${"" /*工具栏区悬浮提示背景颜色，并且还是文字颜色*/}
            --w-e-toolbar-active-color: #333;
            ${"" /*工具栏区选中背景颜色*/}
            --w-e-toolbar-active-bg-color: #bae0ff;
            ${"" /*工具栏区不能选的颜色*/}
            --w-e-toolbar-disabled-color: #999;
            ${"" /*工具栏区分割线颜色*/}
            --w-e-toolbar-border-color: #e8e8e8;
            ${"" /*工具栏区弹窗按钮颜色*/}
            --w-e-modal-button-bg-color: #fafafa;
            ${"" /*工具栏区弹窗边框颜色*/}
            --w-e-modal-button-border-color: #d9d9d9;
        `;
  } else {
    return `
            ${"" /*编辑区域背景颜色*/}
            --w-e-textarea-bg-color: #35363a;
            ${"" /*编辑区域文字颜色*/}
            --w-e-textarea-color: #ffffff;
            ${"" /*未知作用*/}
            --w-e-textarea-border-color: #ccc;
            ${"" /*编辑区域的代码块的边框颜色*/}
            --w-e-textarea-slight-border-color: #e8e8e8;
            ${"" /*未知作用*/}
            --w-e-textarea-slight-color: #d4d4d4;
            ${"" /*编辑区域的代码块的背景颜色*/}
            --w-e-textarea-slight-bg-color: #292a2d;
            ${"" /*编辑区域的选中的边框颜色；例如分割线*/}
            --w-e-textarea-selected-border-color: #ae534c;
            ${"" /*未知作用*/}
            --w-e-textarea-handler-bg-color: #4290f7;
            ${"" /*工具栏区文字颜色*/}
            --w-e-toolbar-color: #ffffff;
            ${"" /*工具栏区背景颜色*/}
            --w-e-toolbar-bg-color: #35363a;
            ${"" /*工具栏区悬浮提示背景颜色，并且还是文字颜色*/}
            --w-e-toolbar-active-color: #fff;
            ${"" /*工具栏区选中背景颜色*/}
            --w-e-toolbar-active-bg-color: #321717;
            ${"" /*工具栏区不能选的颜色*/}
            --w-e-toolbar-disabled-color: #999;
            ${"" /*工具栏区分割线颜色*/}
            --w-e-toolbar-border-color: #e8e8e8;
            ${"" /*工具栏区弹窗按钮颜色*/}
            --w-e-modal-button-bg-color: #292a2d;
            ${"" /*工具栏区弹窗边框颜色*/}
            --w-e-modal-button-border-color: #d9d9d9;
            text-shadow:none;
        `;
  }
};
