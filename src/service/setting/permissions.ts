import fetchService from "@utils/fetchService";
export const getPermissionsData = async function (options: {
  permission_id?: number;
  type?: number;
  key?: string;
  icon?: string;
  vue_icon?: string;
  url?: string;
  label?: string;
  component?: string;
  parent?: number;
  token: string;
  pageNumber?: number;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/select_permissions",
    // url: import.meta.env.VITE_SERVER + "/getmenu/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      permission_id: options.permission_id,
      type: options.type,
      key: options.key,
      icon: options.icon,
      vue_icon: options.vue_icon,
      url: options.url,
      label: options.label,
      component: options.component,
      parent: options.parent,
      pageNumber: options.pageNumber,
    }),

    setLoading: options.setLoading,
    errorResult: {
      code: -1,
      message: [
        {
          id: -1,
          type: -1,
          key: "",
          icon: "",
          vue_icon: "",
          url: "",
          label: "",
          component: "",
          parent: -1,
        },
      ],
    },
  });
};

export const createPermission = async function (options: {
  //   permission_id: number;
  type?: number;
  key?: string;
  icon?: string;
  vue_icon?: string;
  url: string;
  label: string;
  component: string;
  parent: number;
  token: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/create_permission",
    // url: import.meta.env.VITE_SERVER + "/getmenu/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      //   id: options.permission_id,
      type: options.type,
      key: options.key,
      icon: options.icon,
      vue_icon: options.vue_icon,
      url: options.url,
      label: options.label,
      component: options.component,
      parent: options.parent,
    }),
    setLoading: options.setLoading,
    errorResult: {
      code: -1,
      message: {
        id: -1,
        type: -1,
        key: "",
        icon: "",
        vue_icon: "",
        url: "",
        label: "",
        component: "",
        parent: -1,
      },
    },
  });
};

export const editPermission = async function (options: {
  id: number;
  type?: number;
  key?: string;
  icon?: string;
  vue_icon?: string;
  url: string;
  label: string;
  component: string;
  parent: number;
  token: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/edit_permission",
    // url: import.meta.env.VITE_SERVER + "/getmenu/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      id: options.id,
      type: options.type,
      key: options.key,
      icon: options.icon,
      vue_icon: options.vue_icon,
      url: options.url,
      label: options.label,
      component: options.component,
      parent: options.parent,
    }),
    setLoading: options.setLoading,
    errorResult: {
      code: -1,
      message: {
        id: -1,
        type: -1,
        key: "",
        icon: "",
        vue_icon: "",
        url: "",
        label: "",
        component: "",
        parent: -1,
      },
    },
  });
};

export const deletePermission = async function (options: {
  permission_ids: number[];
  token: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/delete_permission",
    // url: import.meta.env.VITE_SERVER + "/getmenu/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      permission_ids: options.permission_ids,
    }),
    setLoading: options.setLoading,
    errorResult: {
      code: -1,
      message: {
        id: -1,
        type: -1,
        key: "",
        icon: "",
        vue_icon: "",
        url: "",
        label: "",
        component: "",
        parent: -1,
      },
    },
  });
};

export const getPermissionCount = async function (options: { token: string }) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/select_permissions_count",
    // url: import.meta.env.VITE_SERVER + "/getmenu/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    // setLoading: options.setLoading,
    errorResult: {
      code: -1,
      message: {
        count: -1,
      },
    },
  });
};
