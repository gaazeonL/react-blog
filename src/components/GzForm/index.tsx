//react引入
import { memo, useState, useEffect } from "react";
//redux引入
import { useSelector } from "react-redux";
import { storeType } from "@store/type";
//i18n引入
import { useTranslation } from "react-i18next";
//antd引入
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Radio from "antd/lib/radio";
import Select from "antd/lib/select";
import TreeSelect from "antd/lib/tree-select";
import Checkbox from "antd/lib/checkbox";
import DatePicker from "antd/lib/date-picker";
//组件内部引入
import { FromFatherProps } from "./type";

const GzForm = memo((props: FromFatherProps) => {
  
  const { t } = useTranslation();
  const token = useSelector<storeType, string>(
    (store) => store.system.globalControl.token
  );
  return (
    <>
      <>
        {props.children?.filter((children) => children.props.slot === "header")}
      </>
      <Form
        layout={props.config.layout}
        labelCol={props.config.formItemLayout?.labelCol}
        wrapperCol={props.config.formItemLayout?.wrapperCol}
        style={props.style}
        size={props.config.size}
        form={props.form}
        initialValues={props.config.initialValues}
        autoComplete={props.config.autoComplete}
      >
        {props.config.items.map((item) => {
          return (
            <Form.Item
              style={{
                margin: "10px",
                ...props.config.formItemStyle,
                ...item.style,
              }}
              key={item.key}
              name={item.key}
              label={item.label ? t(item.label) : item.label}
              valuePropName={item.type === "Checkbox" ? "checked" : undefined}
              rules={item.rules?.map((rule) => {
                if (typeof rule !== "function" && rule.regular) {
                  return () => {
                    return {
                      validator(_, value) {
                        if (
                          typeof value === "string" &&
                          rule.regular &&
                          value.match(rule.regular)
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          rule.message ? t(rule.message) : rule.message
                        );
                      },
                    };
                  };
                }

                return rule;
              })}
            >
              {(() => {
                //返回Input
                if (item.type === "Input") {
                  return (
                    <Input
                      size={item.size}
                      prefix={item.inputOption?.prefix}
                      addonBefore={item.inputOption?.inputBefore}
                      addonAfter={item.inputOption?.inputAfter}
                      placeholder={
                        item.placeholder
                          ? (t(item.placeholder) as string)
                          : item.placeholder
                      }
                    ></Input>
                  );
                }
                //返回Input.Passwod
                else if (item.type === "Password") {
                  return (
                    <Input.Password
                      size={item.size}
                      prefix={item.inputOption?.prefix}
                      addonBefore={item.inputOption?.inputBefore}
                      addonAfter={item.inputOption?.inputAfter}
                      placeholder={item.placeholder}
                      autoComplete="off"
                    />
                  );
                }
                //返回Input.TextArea
                else if (item.type === "TextArea") {
                  <Input.TextArea placeholder={item.placeholder} />;
                }
                //根据checkBoxValue返回checkBox或checkBox组
                else if (item.type === "Checkbox") {
                  if (typeof item.checkBoxValues === "string") {
                    return <Checkbox>{item.checkBoxValues}</Checkbox>;
                  } else if (item.checkBoxValues instanceof Array) {
                    return (
                      <Checkbox.Group>
                        {item.checkBoxValues.map((checkbox) => {
                          return (
                            <Checkbox
                              key={checkbox.value}
                              value={checkbox.value}
                            >
                              {checkbox.title}
                            </Checkbox>
                          );
                        })}
                      </Checkbox.Group>
                    );
                  }
                }
                //返回Radio组
                else if (item.type === "Radio") {
                  return (
                    <Radio.Group>
                      {item.radioValues?.map((radio) => {
                        return (
                          <Radio key={radio.value} value={radio.value}>
                            {radio.title}
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  );
                }
                //返回Select组
                else if (item.type === "Select") {
                  //这样写其实不符合规范，在if中使用了hooks，但是暂时也找不到解决办法
                  const [selectOptonData, setSelectOptonData] = useState<any[]>(
                    []
                  );
                  //异步加载表单数据
                  useEffect(() => {
                    // props.config.items.forEach((item) => {
                    if (item.type === "Select") {
                      item.selectOption?.asyncValue &&
                        item.selectOption.asyncValue(token).then((result) => {
                          setSelectOptonData(result);
                        });
                    }
                    // });
                  }, []);

                  return (
                    <Select
                      mode={item.selectOption?.mode}
                      allowClear
                      options={
                        item.selectOption?.asyncValue
                          ? selectOptonData
                          : undefined
                      }
                    >
                      {item.selectOption?.values &&
                        item.selectOption.values.map((valueItem) => {
                          return (
                            <Select.Option
                              key={valueItem.value}
                              value={valueItem.value}
                            >
                              {valueItem.title}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  );
                } else if (item.type === "TreeSelect") {
                  return (
                    <TreeSelect
                      allowClear
                      treeLine={item.selectOption?.treeLine}
                      multiple={
                        item.selectOption?.mode === "multiple" ? true : false
                      }
                      treeData={item.selectOption?.values}
                    />
                  );
                }
                //返回DatePicker
                else if (item.type === "DatePicker") {
                  return <DatePicker />;
                }
                return <></>;
              })()}
            </Form.Item>
          );
        })}
      </Form>
      <>
        {props.children?.filter((children) => children.props.slot === "footer")}
      </>
    </>
  );
});

export default GzForm;
