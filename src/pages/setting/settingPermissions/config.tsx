import { Translation } from "react-i18next";

import {
  createPermission,
  deletePermission,
  editPermission,
  getPermissionCount,
  getPermissionsData,
} from "@service/setting/permissions";
import { selectFormConfig as selectFormConfigType } from "@components/GzcurdPage/type";
import { curdPageTableConfig } from "@components/GzcurdPage/type";
import Tag from "antd/lib/tag";
import getTagColor from "@utils/getTagColor";

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
        key: "permission_id",
        label: "pages.setting.permissions.selectForm.items.permission_id.label",
      },
      {
        type: "Input",
        key: "type",
        label: "pages.setting.permissions.selectForm.items.type.label",
      },
      {
        type: "Input",
        key: "key",
        label: "pages.setting.permissions.selectForm.items.key.label",
      },
      {
        type: "Input",
        key: "icon",
        label: "pages.setting.permissions.selectForm.items.icon.label",
      },
      {
        type: "Input",
        key: "vue_icon",
        label: "pages.setting.permissions.selectForm.items.vue_icon.label",
      },
      {
        type: "Input",
        key: "url",
        label: "pages.setting.permissions.selectForm.items.url.label",
      },
      {
        type: "Input",
        key: "label",
        label: "pages.setting.permissions.selectForm.items.label.label",
      },
      {
        type: "Input",
        key: "component",
        label: "pages.setting.permissions.selectForm.items.component.label",
      },
      {
        type: "Input",
        key: "parent",
        label: "pages.setting.permissions.selectForm.items.parent.label",
      },
    ],
  },
  selectBtn: {
    title: "pages.setting.permissions.selectForm.selectBtn",
  },
};

export const getTableConfig = (curdPageRef: React.MutableRefObject<any>) => {
  const tableConfig: curdPageTableConfig<{
    id: number;
    type: number;
    key: string;
    icon?: string;
    vue_icon?: string;
    url?: string;
    label?: string;
    component?: string;
    parent?: number;
  }> = {
    name: "pages.setting.permissions.table.name",
    selectService: getPermissionsData,
    getPageCountService:getPermissionCount,
    tableHeadControl: {
      create: {
        title: "pages.setting.permissions.table.tableHeadControl.createBtn",
        onClick: () => {
          curdPageRef.current?.createFormModalRef.current?.handleOpen();
        },
      },
      batchDeletion: {
        title:
          "pages.setting.permissions.table.tableHeadControl.batchDeletionBtn",
        onClick: () => {
          const permission_ids: any[] = [];
          curdPageRef.current?.getSelectedRows().forEach((item: any) => {
            permission_ids.push(item.id);
          });
          curdPageRef.current?.batchDeletionFormModalRef.current?.handleOpen({
            permission_ids,
          });
        },
      },
    },
    columns: (t) => {
      return [
        {
          title: t(
            "pages.setting.permissions.table.columns.permission_id.title"
          ),
          dataIndex: "id",
          key: "id",
        },
        {
          title: t("pages.setting.permissions.table.columns.type.title"),
          key: "type",
          render(_, record) {
            return (
              <Tag
                color={getTagColor(record.type, [
                  "#ff85c0",
                  "#95de64",
                  "#69b1ff",
                  "#ffc53d",
                  "#36cfc9",
                ])}
              >
                {record.type}
              </Tag>
            );
          },
        },
        {
          title: t("pages.setting.permissions.table.columns.key.title"),
          key: "key",
          render(_, record) {
            return <Tag color="#108ee9">{record.key}</Tag>;
          },
          width: 180,
        },
        {
          title: t("pages.setting.permissions.table.columns.icon.title"),
          key: "icon",
          render(_, record) {
            return record.icon ? (
              <Tag color="#3b5999">{record.icon}</Tag>
            ) : (
              <Tag>null</Tag>
            );
          },
        },
        {
          title: t("pages.setting.permissions.table.columns.vue_icon.title"),
          key: "vue_icon",
          render(_, record) {
            return record.vue_icon ? (
              <Tag color="#3b5999">{record.vue_icon}</Tag>
            ) : (
              <Tag>null</Tag>
            );
          },
        },
        {
          title: t("pages.setting.permissions.table.columns.url.title"),
          key: "url",
          render(_, record) {
            return record.url ? (
              <Tag color="#55acee">{record.url}</Tag>
            ) : (
              <Tag>null</Tag>
            );
          },
        },
        {
          title: t("pages.setting.permissions.table.columns.label.title"),
          key: "label",
          render(_, record) {
            return record.label ? (
              <Tag color="#38ce74">{record.label}</Tag>
            ) : (
              <Tag>null</Tag>
            );
          },
        },
        {
          title: t("pages.setting.permissions.table.columns.component.title"),
          key: "component",
          render(_, record) {
            return record.component ? (
              <Tag color="#7e38ce">{record.component}</Tag>
            ) : (
              <Tag>null</Tag>
            );
          },
        },
        {
          title: t("pages.setting.permissions.table.columns.parent.title"),
          key: "parent",
          render(_, record) {
            return record.parent || record.parent === 0 ? (
              <Tag color={getTagColor(record.parent)}>{record.parent}</Tag>
            ) : (
              <Tag>null</Tag>
            );
          },
        },
        {
          title: t("pages.setting.permissions.table.columns.action.title"),
          key: "action",
          render: (_: any, record) => (
            <>
              {/* <Space> */}
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <a
                  onClick={() => {
                    curdPageRef.current?.editFormModalRef.current?.handleOpen(
                      {
                        id: record.id,
                      },
                      {
                        type: record.type,
                        key: record.key,
                        icon: record.icon,
                        vue_icon: record.vue_icon,
                        url: record.url,
                        label: record.label,
                        component: record.component,
                        parent: record.parent,
                      }
                    );
                  }}
                >
                  {t(
                    "pages.setting.permissions.table.columns.action.render.edit"
                  )}
                </a>
                <a
                  onClick={() => {
                    curdPageRef.current?.deleteFormModalRef.current?.handleOpen(
                      {
                        permission_ids: [record.id],
                      }
                    );
                  }}
                >
                  {t(
                    "pages.setting.permissions.table.columns.action.render.delete"
                  )}
                </a>
              </div>
              {/* </Space> */}
            </>
          ),
        },
      ];
    },
    createModelConfig: {
      service: createPermission,
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
            key: "type",
            label:
              "pages.setting.permissions.createModelConfig.items.type.label",
            rules: [
              {
                required: true,
                // message: "请输入权限类型",
              },
            ],
          },
          {
            type: "Input",
            key: "key",
            label:
              "pages.setting.permissions.createModelConfig.items.type.label",
            rules: [
              {
                required: true,
                // message: "请输入权限名",
              },
            ],
          },
          {
            type: "Input",
            key: "icon",
            label:
              "pages.setting.permissions.createModelConfig.items.icon.label",
          },
          {
            type: "Input",
            key: "vue_icon",
            label:
              "pages.setting.permissions.createModelConfig.items.vue_icon.label",
          },
          {
            type: "Input",
            key: "url",
            label:
              "pages.setting.permissions.createModelConfig.items.url.label",
          },
          {
            type: "Input",
            key: "label",
            label:
              "pages.setting.permissions.createModelConfig.items.label.label",
          },
          {
            type: "Input",
            key: "component",
            label:
              "pages.setting.permissions.createModelConfig.items.component.label",
          },
          {
            type: "Input",
            key: "parent",
            label:
              "pages.setting.permissions.createModelConfig.items.parent.label",
          },
        ],
      },
      onServiceFullfilled(_, notification, t) {
        curdPageRef.current.flushTable();
        notification({
          message: t(
            "pages.setting.permissions.createModelConfig.onServiceFullfilled.message"
          ),
        });
      },
    },
    batchDeletionModelConfig: {
      service: deletePermission,
      formConfig: {
        items: [],
      },
      formHeader: (
        <Translation>
          {(t) => (
            <h2>
              {t(
                "pages.setting.permissions.batchDeletionModelConfig.formHeader"
              )}
            </h2>
          )}
        </Translation>
      ),
      onServiceFullfilled(_, notification, t) {
        curdPageRef.current.flushTable();
        curdPageRef.current.setSelectedRowKeysHooks()([]);
        notification({
          message: t(
            "pages.setting.permissions.batchDeletionModelConfig.onServiceFullfilled.message"
          ),
        });
      },
    },
    deleteModelConfig: {
      service: deletePermission,
      formConfig: {
        items: [],
      },
      formHeader: (
        <Translation>
          {(t) => (
            <h2>
              {t("pages.setting.permissions.deleteModelConfig.formHeader")}
            </h2>
          )}
        </Translation>
      ),
      onServiceFullfilled(_, notification, t) {
        curdPageRef.current.flushTable();
        notification({
          message: t(
            "pages.setting.permissions.deleteModelConfig.onServiceFullfilled.message"
          ),
        });
      },
    },
    editModelConfig: {
      service: editPermission,
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
            key: "type",
            label:
              "pages.setting.permissions.createModelConfig.items.type.label",
            rules: [
              {
                required: true,
                // message: "请输入权限类型",
              },
            ],
          },
          {
            type: "Input",
            key: "key",
            label:
              "pages.setting.permissions.createModelConfig.items.key.label",
            rules: [
              {
                required: true,
                // message: "请输入权限名",
              },
            ],
          },
          {
            type: "Input",
            key: "icon",
            label:
              "pages.setting.permissions.createModelConfig.items.icon.label",
          },
          {
            type: "Input",
            key: "vue_icon",
            label:
              "pages.setting.permissions.createModelConfig.items.vue_icon.label",
          },
          {
            type: "Input",
            key: "url",
            label:
              "pages.setting.permissions.createModelConfig.items.url.label",
          },
          {
            type: "Input",
            key: "label",
            label:
              "pages.setting.permissions.createModelConfig.items.label.label",
          },
          {
            type: "Input",
            key: "component",
            label:
              "pages.setting.permissions.createModelConfig.items.component.label",
          },
          {
            type: "Input",
            key: "parent",
            label:
              "pages.setting.permissions.createModelConfig.items.parent.label",
          },
        ],
      },
      onServiceFullfilled(_, notification, t) {
        curdPageRef.current.flushTable();
        notification({
          message: t(
            "pages.setting.permissions.editModelConfig.onServiceFullfilled.message"
          ),
        });
      },
    },
  };
  return tableConfig;
};
