import { Translation } from "react-i18next";

import Tag from "antd/lib/tag";
import {
  getRolesData,
  createRole,
  deleteRole,
  editRole,
  getRolesCount,
} from "@service/setting/roles";
import { selectFormConfig as selectFormConfigType } from "@components/GzcurdPage/type";
import { curdPageTableConfig } from "@components/GzcurdPage/type";
import { getPermissionsData } from "@service/setting/permissions";
import getTagColor from "@utils/getTagColor";
import Divider from "antd/lib/divider";
import Title from "antd/lib/typography/Title";

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
        key: "role_id",
        label: "pages.setting.roles.selectForm.items.role_id.label",
      },
      {
        type: "Input",
        key: "role_name",
        label: "pages.setting.roles.selectForm.items.role_name.label",
      },
      {
        type: "Select",
        key: "permission_ids",
        label: "pages.setting.roles.selectForm.items.permission_ids.label",
        selectOption: {
          mode: "multiple",
          asyncValue: async (token) => {
            if (token) {
              return (await getPermissionsData({ token })).message.map(
                (item) => ({
                  label: item.id,
                  value: item.id,
                })
              );
            } else {
              return [];
            }
          },
        },
      },
      {
        type: "Select",
        key: "permission_keys",
        label: "pages.setting.roles.selectForm.items.permission_keys.label",
        selectOption: {
          mode: "multiple",
          asyncValue: async (token) => {
            if (token) {
              return (await getPermissionsData({ token })).message.map(
                (item) => ({
                  label: item.key,
                  value: item.key,
                })
              );
            } else {
              return [];
            }
          },
        },
      },
    ],
  },
  selectBtn: {
    title: "pages.setting.roles.selectForm.selectBtn",
  },
};

export const getTableConfig = (curdPageRef: React.MutableRefObject<any>) => {
  const tableConfig: curdPageTableConfig<{
    key: string;
    id: number;
    role_name: string;
    permissions: { permission_id: number; key: string }[];
  }> = {
    name: "pages.setting.roles.table.name",
    selectService: getRolesData,
    getPageCountService:getRolesCount,
    tableHeadControl: {
      create: {
        title: "pages.setting.roles.table.tableHeadControl.createBtn",
        onClick: () => {
          curdPageRef.current?.createFormModalRef.current?.handleOpen();
        },
      },
    },
    columns: (t) => {
      return [
        {
          title: t("pages.setting.roles.table.columns.role_id.title"),
          dataIndex: "id",
          key: "id",
        },
        {
          title: t("pages.setting.roles.table.columns.role_name.title"),
          dataIndex: "role_name",
          key: "role_name",
        },
        {
          title: t("pages.setting.roles.table.columns.permissions_id.title"),
          key: "permissions_id",
          ellipsis: true,
          render: (
            _: any,
            record: {
              key: string;
              id: number;
              role_name: string;
              permissions: { permission_id: number; key: string }[];
            }
          ) => {
            return (
              <>
                {record.permissions.map((item) => (
                  // item.permission_id
                  <Tag color={getTagColor(item.permission_id)} key={item.key}>
                    {item.permission_id}
                  </Tag>
                ))}
              </>
            );
          },
        },
        {
          title: t("pages.setting.roles.table.columns.permissions_name.title"),
          key: "permissions_name",
          ellipsis: true,
          render: (
            _: any,
            record: {
              key: string;
              id: number;
              role_name: string;
              permissions: { permission_id: number; key: string }[];
            }
          ) => {
            return (
              <>
                {record.permissions.map((item) => (
                  // item.key
                  <Tag color={getTagColor(item.permission_id)} key={item.key}>
                    {item.key}
                  </Tag>
                ))}
              </>
            );
          },
        },
        {
          title: t("pages.setting.roles.table.columns.action.title"),
          key: "action",
          render: (
            _: any,
            record: {
              key: string;
              id: number;
              role_name: string;
              permissions: { permission_id: number; key: string }[];
            }
          ) => (
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
                          role_id: record.id,
                        },
                        {
                          role_name: record.role_name,
                          permission_ids: record.permissions.map(
                            (permission) => {
                              return permission.permission_id;
                            }
                          ),
                        }
                      );
                    }
                  }}
                >
                  {t("pages.setting.roles.table.columns.action.render.edit")}
                </a>
                <a
                  onClick={() => {
                    curdPageRef?.current?.deleteFormModalRef?.current?.handleOpen(
                      {
                        role_id: record.id,
                      }
                    );
                  }}
                >
                  {t("pages.setting.roles.table.columns.action.render.delete")}
                </a>
              </div>
              {/* </Space> */}
            </>
          ),
        },
      ];
    },
    expandable: {
      expandedRowRender: (record) => (
        <>
          <div>
            <Title level={5}>
              <Translation>
                {(t) =>
                  t("pages.setting.roles.table.columns.permissions_id.title")
                }
              </Translation>
            </Title>
            {record.permissions.map((item) => (
              // item.key
              <Tag
                color={getTagColor(item.permission_id)}
                style={{ margin: 5 }}
                key={item.permission_id}
              >
                {item.permission_id}
              </Tag>
            ))}
          </div>
          <Divider />
          <div>
            <Title level={5}>
              {" "}
              <Translation>
                {(t) =>
                  t("pages.setting.roles.table.columns.permissions_name.title")
                }
              </Translation>
            </Title>
            {record.permissions.map((item) => (
              // item.key
              <Tag
                color={getTagColor(item.permission_id)}
                style={{ margin: 5 }}
                key={item.key}
              >
                {item.key}
              </Tag>
            ))}
          </div>
        </>
      ),
    },
    createModelConfig: {
      service: createRole,
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
            key: "role_name",
            label:
              "pages.setting.roles.createModelConfig.items.role_name.label",
            rules: [
              {
                required: true,
                // message:
                //   "pages.setting.roles.createModelConfig.items.role_name.rules.0.message",
              },
            ],
          },
          {
            type: "Select",
            key: "permission_keys",
            label:
              "pages.setting.roles.createModelConfig.items.permission_keys.label",
            selectOption: {
              mode: "multiple",
              asyncValue: async (token) => {
                if (token) {
                  return (await getPermissionsData({ token })).message.map(
                    (item) => ({
                      label: item.id + "." + item.key,
                      value: item.key,
                    })
                  );
                } else {
                  return [];
                }
              },
            },
          },
        ],
      },
      onServiceFullfilled(_, notification, t) {
        curdPageRef.current.flushTable();
        notification({
          message: t(
            "pages.setting.roles.createModelConfig.onServiceFullfilled.message"
          ),
        });
      },
    },
    deleteModelConfig: {
      service: deleteRole,
      formConfig: {
        items: [],
      },
      formHeader: (
        <Translation>
          {(t) => (
            <h2>{t("pages.setting.roles.deleteModelConfig.formHeader")}</h2>
          )}
        </Translation>
      ),
      onServiceFullfilled(_, notification, t) {
        curdPageRef.current.flushTable();
        notification({
          message: t(
            "pages.setting.roles.deleteModelConfig.onServiceFullfilled.message"
          ),
        });
      },
    },
    editModelConfig: {
      service: editRole,
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
            key: "role_name",
            label: "pages.setting.roles.editModelConfig.items.role_name.label",
          },
          {
            type: "Select",
            key: "permission_ids",
            label:
              "pages.setting.roles.editModelConfig.items.permission_ids.label",
            selectOption: {
              mode: "multiple",
              asyncValue: async (token) => {
                if (token) {
                  return (await getPermissionsData({ token })).message.map(
                    (item) => ({
                      label: item.id + "." + item.key,
                      value: item.id,
                    })
                  );
                } else {
                  return [];
                }
              },
            },
          },
        ],
      },
      onServiceFullfilled(_, notification, t) {
        curdPageRef.current.flushTable();
        notification({
          message: t(
            "pages.setting.roles.editModelConfig.onServiceFullfilled.message"
          ),
        });
      },
    },
  };
  return tableConfig;
};
