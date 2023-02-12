import fetchService from "@utils/fetchService";
export const getUsersData = async function (options: {
  user_id?: number;
  user_name?: string;
  role_id?: number;
  token: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/select_users",
    // url: import.meta.env.VITE_SERVER + "/getmenu/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      user_id: options.user_id,
      user_name: options.user_name,
      role_id: options.role_id,
    }),
    setLoading: options.setLoading,
    errorResult: {
      code: -1,
      message: [
        {
          id: -1,
          user_name: "",
          avatar_url: null,
          role_id: -1,
          role_name: "",
        },
      ],
    },
  });
};

export const createUser = async function (options: {
  user_name: string;
  password: string;
  avatar_url?: string;
  role_id: number;
  token: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/register/permission",
    // url: import.meta.env.VITE_SERVER + "/getmenu/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      user_name: options.user_name,
      password: options.password,
      avatar_url: options.avatar_url,
      role_id: options.role_id,
    }),
    setLoading: options.setLoading,
    errorResult: {
      code: -1,
      message: {
        id: -1,
        user_name: "",
        avatar_url: null,
        role_id: -1,
        role_name: "",
      },
    },
  });
};

export const deleteUser = async function (options: {
  user_name: string;
  token: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/delete_user",
    // url: import.meta.env.VITE_SERVER + "/getmenu/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      user_name: options.user_name,
    }),
    setLoading: options.setLoading,
    errorResult: {
      code: -1,
      message: {
        id: -1,
        user_name: "",
        avatar_url: null,
        role_id: -1,
        role_name: "",
      },
    },
  });
};
export const deleteUsers = async function (options: {
  user_ids: number[];
  token: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/delete_users",
    // url: import.meta.env.VITE_SERVER + "/getmenu/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      user_ids: options.user_ids,
    }),
    setLoading: options.setLoading,
    errorResult: {
      code: -1,
      message: [
        {
          id: -1,
          user_name: "",
          avatar_url: null,
          role_id: -1,
          role_name: "",
        },
      ],
    },
  });
};

export const editUser = async function (options: {
  user_name: string;
  password?: string;
  avatar_url?: string;
  role_id?: number;
  token: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/edit_user",
    // url: import.meta.env.VITE_SERVER + "/getmenu/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token,
    },
    body: JSON.stringify({
      user_name: options.user_name,
      password: options.password,
      avatar_url: options.avatar_url,
      role_id: options.role_id,
    }),
    setLoading: options.setLoading,
    errorResult: {
      code: -1,
      message: {
        id: -1,
        user_name: "",
        avatar_url: null,
        role_id: -1,
        role_name: "",
      },
    },
  });
};
export const getUsersCount = async function (options: { token: string }) {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/setting/select_users_count",
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
