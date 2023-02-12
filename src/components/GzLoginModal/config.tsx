import { formConfig } from "@components/GzForm/type";
const config: formConfig = {
  autoComplete: "off",
  layout: "inline",
  formItemLayout: {
    labelCol: {
      span: 5,
    },
  },
  items: [
    {
      type: "Input",
      key: "user",
      label: "用户名",
      //   size: "large",
      style: {
        width: 300,
        marginTop: 20,
      },
      placeholder: "请输入用户名",
      rules: [
        {
          regular: /^[a-zA-Z0-9]{5,10}$/,
          message: "用户名只能为5到10位数字或字母",
        },
        {
          required: true,
          message: "",
        },
      ],
    },
    {
      type: "Password",
      key: "password",
      label: "密码",
      //   size: "large",
      style: {
        width: 300,
        marginTop: 20,
      },
      placeholder: "请输入密码",
      rules: [
        {
          regular: /^[a-zA-Z0-9]{6,12}$/,
          message: "密码只能为6到12位",
        },
        {
          required: true,
          message: "",
        },
      ],
    },
    {
      type: "Checkbox",
      key: "remeberUser",
      style: {
        marginTop: 20,
        minWidth: 0,
      },
      checkBoxValues: "记住我",
    },
  ],
};
export default config;
