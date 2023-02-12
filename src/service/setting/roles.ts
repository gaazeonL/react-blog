import fetchService from "@utils/fetchService";
export const getRolesData = async function (options: {
  role_id?: number;
  role_name?: string;
  permission_ids?: number[];
  permission_keys?: string[];
  token: string;
  pageNumber?: number;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/select_roles",
    // url: import.meta.env.VITE_SERVER + "/getmenu/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      role_id: options.role_id,
      role_name: options.role_name,
      permission_ids: options.permission_ids,
      permission_keys: options.permission_keys,
      pageNumber: options.pageNumber,
    }),

    setLoading: options.setLoading,
    errorResult: {
      code: -1,
      message: [
        {
          id: -1,
          role_name: "",
          permissions: [],
        },
      ],
    },
  });
};

export const createRole = async function (options: {
  role_name: string;
  permission_keys?: string[];
  token: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/create_role",
    // url: import.meta.env.VITE_SERVER + "/getmenu/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      role_name: options.role_name,
      permission_keys: options.permission_keys,
    }),
    setLoading: options.setLoading,
    errorResult: {
      code: -1,
      message: {
        id: -1,
        role_name: "",
        updatedAt: "",
        createdAt: "",
      },
    },
  });
};
export const deleteRole = async function (options: {
  role_id: number;
  token: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/delete_role",
    // url: import.meta.env.VITE_SERVER + "/getmenu/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      role_id: options.role_id,
    }),
    setLoading: options.setLoading,
    errorResult: {
      code: -1,
      message: {
        id: -1,
        role_name: "",
        role_permissions: [],
      },
    },
  });
};

export const editRole = async function (options: {
  role_id: number;
  role_name: string;
  permission_ids?: number[];
  token: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/edit_role",
    // url: import.meta.env.VITE_SERVER + "/getmenu/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      role_id: options.role_id,
      role_name: options.role_name,
      permission_ids: options.permission_ids,
    }),
    setLoading: options.setLoading,
    errorResult: {
      code: -1,
      message: {
        id: -1,
        role_name: "",
        role_permissions: [],
      },
    },
  });
};
export const getRolesCount = async function (options: { token: string }) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/select_roles_count",
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
