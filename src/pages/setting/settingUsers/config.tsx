import { Translation } from "react-i18next";

import {
  getUsersData,
  createUser,
  deleteUser,
  editUser,
  deleteUsers,
  getUsersCount,
} from "@service/setting/users";
import { selectFormConfig as selectFormConfigType } from "@components/GzcurdPage/type";
import { curdPageTableConfig } from "@components/GzcurdPage/type";
import Tag from "antd/lib/tag";
import getTagColor from "@utils/getTagColor";
import { getRolesData } from "@service/setting/roles";

export const selectFormConfig: selectFormConfigType = {
  config: {
    autoComplete: "off",
    // layout: "inline",
    formItemStyle: {
      width: "80%",
      margin: "20px 0",
    },
    formItemLayout: {
      labelCol: {
        span: 5,
      },
    },
    size: "large",
    items: [
      {
        type: "Input",
        key: "user_id",
        label: "pages.setting.users.selectForm.items.user_id.label",
      },
      {
        type: "Input",
        key: "user_name",
        label: "pages.setting.users.selectForm.items.user_name.label",
      },
      {
        type: "Select",
        key: "role_id",
        label: "pages.setting.users.selectForm.items.role_id.label",
        selectOption: {
          asyncValue: async (token) => {
            const result: {
              label: any;
              value: any;
            }[] = [];
            const rolesData = (await getRolesData({ token })).message;
            rolesData.forEach((data) => {
              result.push({
                label: (
                  <>
                    <Tag>{data.id}</Tag>
                    <Tag color={getTagColor(data.id)}>{data.role_name}</Tag>
                  </>
                ),
                value: data.id,
              });
            });
            return result;
          },
        },
      },
    ],
  },
  selectBtn: {
    title: "pages.setting.users.selectForm.selectBtn",
  },
};

export const getTableConfig = (curdPageRef: React.MutableRefObject<any>) => {
  const tableConfig: curdPageTableConfig<{
    id: number;
    user_name: string;
    avatar_url?: string;
    role_id: number;
    role_name: string;
  }> = {
    name: "pages.setting.users.table.name",
    selectService: getUsersData,
    getPageCountService: getUsersCount,
    tableHeadControl: {
      create: {
        title: "pages.setting.users.table.tableHeadControl.createBtn",
        onClick: () => {
          curdPageRef.current?.createFormModalRef.current?.handleOpen();
        },
      },
      batchDeletion: {
        title: "pages.setting.users.table.tableHeadControl.batchDeletionBtn",
        onClick: () => {
          const user_ids: any[] = [];
          curdPageRef.current?.getSelectedRows().forEach((item: any) => {
            user_ids.push(item.id);
          });
          curdPageRef.current?.batchDeletionFormModalRef.current?.handleOpen({
            user_ids,
          });
        },
      },
    },
    columns: (t) => {
      return [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: t("pages.setting.users.table.columns.user_name.title"),
          dataIndex: "user_name",
          key: "user_name",
        },
        {
          title: t("pages.setting.users.table.columns.avatar_url.title"),
          key: "avatar_url",
          render: (_: any, record) => {
            if (record.avatar_url) {
              return record.avatar_url;
            } else {
              return (
                <Tag color="#108ee9">
                  {t(
                    "pages.setting.users.table.columns.avatar_url.render.tips"
                  )}
                </Tag>
              );
            }
          },
        },
        {
          title: t("pages.setting.users.table.columns.role_id.title"),
          key: "role_id",
          render: (_: any, record) => {
            return (
              <Tag color={getTagColor(record.role_id)}>{record.role_id}</Tag>
            );
          },
        },
        {
          title: t("pages.setting.users.table.columns.role_name.title"),
          key: "role_name",
          render: (_: any, record) => {
            return (
              <Tag color={getTagColor(record.role_id)}>{record.role_name}</Tag>
            );
          },
        },
        {
          title: t("pages.setting.users.table.columns.action.title"),
          key: "action",
          render: (_: any, record) => (
            <>
              {/* <Space> */}
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <a
                  onClick={() => {
                    if (
                      curdPageRef?.current?.editFormModalRef?.current
                        ?.handleOpen
                    ) {
                      curdPageRef.current.editFormModalRef.current.handleOpen(
                        {
                          user_name: record.user_name,
                        },
                        {
                          role_id: record.role_id,
                        }
                      );
                    }
                  }}
                >
                  {t("pages.setting.users.table.columns.action.render.edit")}
                </a>
                <a
                  onClick={() => {
                    curdPageRef?.current?.deleteFormModalRef?.current?.handleOpen(
                      {
                        user_name: record.user_name,
                      }
                    );
                  }}
                >
                  {t("pages.setting.users.table.columns.action.render.delete")}
                </a>
              </div>
              {/* </Space> */}
            </>
          ),
        },
      ];
    },
    createModelConfig: {
      service: createUser,
      formConfig: {
        autoComplete: "off",
        formItemLayout: {
          labelCol: {
            span: 6,
          },
        },
        formItemStyle: {
          marginTop: 30,
          marginBottom: 30,
        },
        items: [
          {
            type: "Input",
            key: "user_name",
            label:
              "pages.setting.users.createModelConfig.items.user_name.label",
            placeholder:
              "pages.setting.users.createModelConfig.items.user_name.placeholder",
            rules: [
              {
                regular: /^[a-zA-Z0-9]{5,10}$/,
                message:
                  "pages.setting.users.createModelConfig.items.user_name.rules.0.message",
              },
              {
                required: true,
                message: "",
              },
            ],
          },
          {
            type: "Input",
            key: "password",
            label: "pages.setting.users.createModelConfig.items.password.label",
            placeholder:
              "pages.setting.users.createModelConfig.items.password.placeholder",
            rules: [
              {
                regular: /^[a-zA-Z0-9]{6,12}$/,
                message:
                  "pages.setting.users.createModelConfig.items.password.rules.0.message",
              },
              {
                required: true,
                message: "",
              },
            ],
          },
          {
            type: "Select",
            key: "role_id",
            label: "pages.setting.users.createModelConfig.items.role_id.label",
            selectOption: {
              asyncValue: async (token) => {
                const result: {
                  label: any;
                  value: any;
                }[] = [];
                const rolesData = (await getRolesData({ token })).message;
                rolesData.forEach((data) => {
                  result.push({
                    label: (
                      <>
                        <Tag>{data.id}</Tag>
                        <Tag color={getTagColor(data.id)}>{data.role_name}</Tag>
                      </>
                    ),
                    value: data.id,
                  });
                });
                return result;
              },
            },
          },
        ],
      },
      onServiceFullfilled(_, notification, t) {
        curdPageRef.current.flushTable();
        notification({
          message: t(
            "pages.setting.users.createModelConfig.onServiceFullfilled.message"
          ),
        });
      },
    },
    batchDeletionModelConfig: {
      service: deleteUsers,
      serviceParms: {
        user_ids: [],
      },
      formConfig: {
        items: [],
      },
      formHeader: (
        <Translation>
          {(t) => (
            <h2>
              {t("pages.setting.users.batchDeletionModelConfig.formHeader")}
            </h2>
          )}
        </Translation>
      ),
      onServiceFullfilled(_, notification, t) {
        curdPageRef.current.flushTable();
        curdPageRef.current.setSelectedRowKeysHooks()([]);
        notification({
          message: t(
            "pages.setting.users.batchDeletionModelConfig.onServiceFullfilled.message"
          ),
        });
      },
    },
    deleteModelConfig: {
      service: deleteUser,
      formConfig: {
        items: [],
      },
      formHeader: (
        <Translation>
          {(t) => (
            <h2>{t("pages.setting.users.deleteModelConfig.formHeader")}</h2>
          )}
        </Translation>
      ),
      onServiceFullfilled(_, notification, t) {
        curdPageRef.current.flushTable();
        notification({
          message: t(
            "pages.setting.users.deleteModelConfig.onServiceFullfilled.message"
          ),
        });
      },
    },
    editModelConfig: {
      service: editUser,
      formConfig: {
        autoComplete: "off",
        formItemLayout: {
          labelCol: {
            span: 6,
          },
        },
        formItemStyle: {
          marginTop: 30,
          marginBottom: 30,
        },
        items: [
          {
            type: "Input",
            key: "password",
            label: "pages.setting.users.editModelConfig.items.password.label",
          },
          {
            type: "Select",
            key: "role_id",
            label: "pages.setting.users.editModelConfig.items.role_id.label",
            selectOption: {
              asyncValue: async (token) => {
                const result: {
                  label: any;
                  value: any;
                }[] = [];
                const rolesData = (await getRolesData({ token })).message;
                rolesData.forEach((data) => {
                  result.push({
                    label: (
                      <>
                        <Tag>{data.id}</Tag>
                        <Tag color={getTagColor(data.id)}>{data.role_name}</Tag>
                      </>
                    ),
                    value: data.id,
                  });
                });
                return result;
              },
            },
          },
        ],
      },
      onServiceFullfilled(_, notification, t) {
        curdPageRef.current.flushTable();
        notification({
          message: t(
            "pages.setting.users.editModelConfig.onServiceFullfilled.message"
          ),
        });
      },
    },
  };
  return tableConfig;
};
