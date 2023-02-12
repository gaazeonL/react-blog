//react引入
import React, {
  forwardRef,
  Fragment,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
//redux引入
import { useSelector } from "react-redux";
import { storeType } from "@store/type";
//i18n引入
import { useTranslation } from "react-i18next";
//antd引入
import { useForm } from "antd/lib/form/Form";
import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
//uuid生成引入
import { v4 } from "uuid";
//内部组件引入
import GzForm from "@components/GzForm";
import GzFormModal from "@components/GzFormModal";

import { TableStyle } from "./style";
import { FormModalRef, FromFatherProps } from "./type";

import { getPermissionCount } from "@service/setting/permissions";

const GzcurdPage = memo(
  forwardRef((props: FromFatherProps, ref) => {
    const { t } = useTranslation();
    const tableHeight = 550;
    //获取token，不管会不会用到
    const token = useSelector<storeType, string>(
      (store) => store.system.globalControl.token
    );
    const [form] = useForm();
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(false);

    //多选框会用到
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setselectedRows] = useState<any[]>([]);
    const onSelectChange = (
      newSelectedRowKeys: React.Key[],
      newSelectedRows: any[]
    ) => {
      setselectedRows(newSelectedRows);
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };

    const flushTable = (parms?: { [X: string]: any }) => {
      props.tableConfig
        .selectService({ ...parms, token, setLoading })
        .then((result) => {
          const newData = result.message.map((data: any) => {
            return data.key
              ? data
              : {
                  key: v4(),
                  ...data,
                };
          });
          // if (newData.length < 10) {
          //   //如果这一页结果没有10个，那么后面的页数自然也是空的
          //   // setPageCount(pageNumber * 10 );
          //   console.log(parms?.pageNumber);
          // } else {
          //   setPageCount(staticPageCount);
          // }
          setData(newData);
        });
    };

    const setSelectedRowKeysHooks = () => {
      return setSelectedRowKeys;
    };
    const getSelectedRowKeys = () => {
      return selectedRowKeys;
    };

    const getSelectedRows = () => {
      return selectedRows;
    };

    //刷新表格方法传出去
    useImperativeHandle(ref, () => {
      return {
        flushTable,
        setSelectedRowKeysHooks,
        getSelectedRowKeys,
        getSelectedRows,
        createFormModalRef,
        batchDeletionFormModalRef,
        deleteFormModalRef,
        editFormModalRef,
      };
    });
    //首次进入加载表格
    useEffect(() => {
      flushTable({ pageNumber: 1 });
    }, []);
    //创建项目的弹窗表单
    const createFormModalRef = useRef<FormModalRef>(null);
    //批量删除项目的弹窗表单
    const batchDeletionFormModalRef = useRef<FormModalRef>(null);
    //删除项目的弹窗表单
    const deleteFormModalRef = useRef<FormModalRef>(null);
    //编辑项目的弹窗表单
    const editFormModalRef = useRef<FormModalRef>(null);
    const modalConfigKeys = [
      {
        key: "createModelConfig",
        ref: createFormModalRef,
      },
      {
        key: "deleteModelConfig",
        ref: deleteFormModalRef,
      },
      {
        key: "batchDeletionModelConfig",
        ref: batchDeletionFormModalRef,
      },
      {
        key: "editModelConfig",
        ref: editFormModalRef,
      },
    ];

    /**表头参数,如果配置了createModelConfig或batchDeletionModelConfig才会加载 */
    const TableHearder =
      props.tableConfig.createModelConfig ||
      props.tableConfig.batchDeletionModelConfig
        ? () => (
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "space-between",
              }}
            >
              <div style={{ lineHeight: "64px" }}>
                {
                  //如果配置了createModelConfig就会加载这个按钮
                  props.tableConfig.createModelConfig ? (
                    <Button
                      style={{ margin: "0 10px" }}
                      type="primary"
                      onClick={
                        props.tableConfig.tableHeadControl?.create?.onClick
                      }
                    >
                      {props.tableConfig.tableHeadControl?.create?.title
                        ? t(props.tableConfig.tableHeadControl.create.title)
                        : t("components.curdPage.tableHeadControl.createBtn")}
                    </Button>
                  ) : (
                    <></>
                  )
                }
                {
                  //如果配置了batchDeletionModelConfig就会加载这个按钮
                  props.tableConfig.batchDeletionModelConfig ? (
                    <Button
                      style={{ margin: "0 10px" }}
                      type="primary"
                      danger
                      disabled={selectedRowKeys.length === 0 ? true : false}
                      onClick={
                        props.tableConfig.tableHeadControl?.batchDeletion
                          ?.onClick
                      }
                    >
                      {props.tableConfig.tableHeadControl?.batchDeletion?.title
                        ? t(
                            props.tableConfig.tableHeadControl.batchDeletion
                              .title
                          )
                        : t(
                            "components.curdPage.tableHeadControl.batchDeletionBtn"
                          )}
                    </Button>
                  ) : (
                    <></>
                  )
                }
              </div>
              <Typography.Title level={5}>
                {props.tableConfig.name
                  ? t(props.tableConfig.name)
                  : props.tableConfig.name}
              </Typography.Title>
            </div>
          )
        : undefined;

    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [staticPageCount, setStaticPageCount] = useState(0);
    const pageOnChange = (page: number) => {
      setPageNumber(page);
      flushTable({ ...form.getFieldsValue(), pageNumber: page });
    };
    useEffect(() => {
      props.tableConfig.getPageCountService({ token }).then((result: any) => {
        setPageCount(result.message.count);
        setStaticPageCount(result.message.count);
      });
    }, []);

    return (
      <>
        {modalConfigKeys.map((item) => {
          //检查props里面有配置没对应Modal项目，如果没有，就不渲染对应Modal
          return props.tableConfig[item.key]?.service ? (
            <GzFormModal
              key={item.key}
              ref={item.ref}
              formStyle={props.tableConfig[item.key].formStyle}
              formConfig={props.tableConfig[item.key].formConfig}
              formHeader={props.tableConfig[item.key].formHeader}
              formFooter={props.tableConfig[item.key].formFooter}
              service={props.tableConfig[item.key].service}
              onServiceFullfilled={
                props.tableConfig[item.key].onServiceFullfilled
              }
              onServiceRejected={props.tableConfig[item.key].onServiceRejected}
            ></GzFormModal>
          ) : (
            <Fragment key={item.key}></Fragment>
          );
        })}
        <div style={{ margin: "40px 20px" }}>
          <GzForm config={props.selectFormConfig.config} form={form}></GzForm>
          <div style={{ float: "right", margin: "40px 0" }}>
            <Button
              type="primary"
              onClick={() => {
                flushTable({ ...form.getFieldsValue(), pageNumber: 1 });
                setPageNumber(1);
              }}
            >
              {props.selectFormConfig.selectBtn?.title
                ? t(props.selectFormConfig.selectBtn?.title)
                : ""}
            </Button>
          </div>
        </div>
        <TableStyle
          rowSelection={
            batchDeletionFormModalRef.current ? rowSelection : undefined
          }
          dataSource={data}
          columns={props.tableConfig.columns(t)}
          expandable={props.tableConfig.expandable}
          loading={loading}
          title={TableHearder}
          pagination={{
            position: ["bottomLeft"],
            current: pageNumber,
            total: pageCount,
            onChange: pageOnChange,
          }}
          scroll={{ x: 100 * props.tableConfig.columns.length, y: tableHeight }}
        ></TableStyle>
      </>
    );
  })
);

export default GzcurdPage;
